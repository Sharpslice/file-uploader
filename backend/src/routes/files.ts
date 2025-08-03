import express from 'express'
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3'

import path from 'path';
import fs from 'fs';
import { Request } from 'express';
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



//const uploadsDirectory = path.join( __dirname,'..','..','uploads')
 //multer({dest:uploadsDirectory})
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
// files.use('/uploads',express.static(uploadsDirectory))
// files.get('/directory',(req,res)=>{
//     console.log('hello')
//     fs.readdir(uploadsDirectory,(err,files)=>{
//         if(err) {
//             console.log('fail')
//         }
            
           
//             console.log('success!')
//         res.json({files,error:'none'})
//     })
// })





files.post('/photo/upload',upload.single('random-file'),(req,res)=>{
    if (!req.file) {
        console.log('no file')
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file,req.body)
    res.json({ message: 'Upload successful', file: req.file });
    
})



export default files