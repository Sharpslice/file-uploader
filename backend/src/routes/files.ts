import express from 'express'
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client,ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import dotenv from 'dotenv'
import {authenticatedRequest} from './auth'


dotenv.config();

console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_KEY ? '***' : 'NOT SET');
console.log('AWS_REGION:', process.env.AWS_REGION);
const files = express.Router();

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    }
   
    
}) 

interface FileData{
    fileName: string
    fileType: string | null
    Key: string
    LastModified:Date
    presignedUrl : string | null
}


const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        
        key:function(req : authenticatedRequest,file,cb){
            const unique = `user-${req.user.username}/${Date.now()}-${file.originalname}`
            cb(null,unique)
        }



    })
})
const extractFileName = (s3Key: string): string => {
  const match = s3Key.match(/\/(?:[^\/]+\/)*[^\/]*?-(.+\.[a-zA-Z0-9]+)$/);
  return match?.[1] || 'unknown';
};

async function getFileFromUsersBucket(prefix=""):Promise<FileData[]>{
    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Prefix : prefix
    }
    try{
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);
        console.log(data)

        if(!data.Contents || data.Contents.length ==0) return [];

        return data.Contents.map((file): FileData=>{
            return (
                {
                    fileName: extractFileName(file.Key!),
                    fileType: file.Key?.split('.').pop()!,
                    Key: file.Key!,
                    LastModified:file.LastModified!,
                    presignedUrl: null
                }  
            )
        })
        
    }catch(error){
        return []
    }
}


files.get('/:username',async(req,res)=>{
    const username = req.params.username;
    const response = await getFileFromUsersBucket(`user-${username}`)
    res.json({files : response})
})

files.post('/photo/upload',upload.single('random-file'),(req,res)=>{
    if (!req.file) {
        console.log('no file')
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file,req.body)
    res.json({ message: 'Upload successful', file: req.file });
    
})

async function getPresignedUrl(key:string){
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    })

    const url =await getSignedUrl(s3,command,{expiresIn:60});
    return url
}

files.get('/:username/presigned/:fileKey(*)',async(req,res)=>{
    
    const {username, fileKey} = req.params;
     console.log('username:', username);
    console.log('fileKey:', fileKey);
    console.log(fileKey)
    const url = await getPresignedUrl(fileKey)
    res.json({url})
})






export default files