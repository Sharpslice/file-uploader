import axios from "axios"
import { useContext, useEffect, useState } from "react"
import './FilesList.css'
import { AuthContext } from "../../AuthProvider";
import { PreviewContext} from "../../PreviewProvider";

interface FileData{
    fileName: string
    fileType: string | null
    Key: string
    LastModified:Date
    presignedUrl : string | null
}

function FilesList(){
    

    const [filesList,setFilesList] = useState<FileData[]>([]);
    const {authUser} = useContext(AuthContext)!;
    const {setFileData} = useContext(PreviewContext)!;
    useEffect(()=>{
        const fetchFiles = async()=>{
            const response = await axios.get(`http://localhost:3000/files/${authUser!.username}`,{withCredentials:true})
            console.log(response.data.files)
            setFilesList(response.data.files)
            
            
        }
        fetchFiles();
    },[authUser])

    const convertToLegibleDate = (dateStr:Date)=>{
        return dateStr.toLocaleString()
    }
  

    const onFileClick = async(fileData:FileData,fileKey:string)=>{
        const response = await axios.get(`http://localhost:3000/files/${authUser?.username}/presigned/${encodeURIComponent(fileKey)}`,{withCredentials:true})
        console.log(response.data.url)
        
        setFileData({...fileData,presignedUrl:response.data.url})

    }

    return(<>
        <div className="file-list">
        
            {filesList.map((file)=>{
                return (
                    <button className="file-tile" key={file.Key} onClick={()=>onFileClick(file,file.Key)}> 
                        <div className="file-tile__file-name">{file.fileName} </div>
                        <div className="file-tile__file-access">{authUser?.username}</div>
                        <div className="file-tile__file-date">{convertToLegibleDate(file.LastModified)}</div>
                    </button>
                 )
             })}
            
        </div>
        
    </>)
}

export default FilesList