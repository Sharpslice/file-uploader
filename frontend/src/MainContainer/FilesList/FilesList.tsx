import axios from "axios"
import { useContext, useEffect, useState } from "react"
import './FilesList.css'
import { AuthContext } from "../../AuthProvider";
type s3File = {
    Key:string,
    LastModified: string,
}

function FilesList(){


    const [filesList,setFilesList] = useState<s3File[]>([]);
    const {authUser} = useContext(AuthContext)!;
    useEffect(()=>{
        const fetchFiles = async()=>{
            const response = await axios.get(`http://localhost:3000/files/${authUser!.username}`,{withCredentials:true})
            console.log(response.data.files)
            setFilesList(response.data.files)
            
            
        }
        fetchFiles();
    },[authUser])

    const convertToLegibleDate = (dateStr:string)=>{
        return new Date(dateStr).toLocaleString()
    }
    const convertFileName = (fileStr:string) =>{
        const splittedString = fileStr.split('/')
        const keyWithoutFolder = splittedString[splittedString.length-1]
        const splittedKey = keyWithoutFolder.split('-')
        return splittedKey.pop()
    }

    const onFileClick = async(fileKey:string)=>{
        const response = await axios.get(`http://localhost:3000/files/${authUser?.username}/presigned/${encodeURIComponent(fileKey)}`,{withCredentials:true})
        console.log(response.data.url)
    }

    return(<>
        <div className="file-list">
            {/* <div className="file-list__header">
                <button>Name</button>
                <button>Who Can access</button>
                <button>Modified</button>
            </div> */}
            {filesList.map((file)=>{
                return (
                    <button className="file-tile" key={file.Key} onClick={()=>onFileClick(file.Key)}> 
                        <div className="file-tile__file-name">{convertFileName(file.Key)} </div>
                        <div className="file-tile__file-access">{authUser?.username}</div>
                        <div className="file-tile__file-date">{convertToLegibleDate(file.LastModified)}</div>
                    </button>
                 )
             })}
            
        </div>
        
    </>)
}

export default FilesList