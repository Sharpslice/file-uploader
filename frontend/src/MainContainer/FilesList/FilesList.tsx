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

    return(<>
        <div className="file-list">
            {filesList.map((file)=>{
                return (
                    <div key={file.Key}> 
                        {convertFileName(file.Key) + convertToLegibleDate(file.LastModified)}

                    </div>
                 )
             })}
            
        </div>
        
    </>)
}

export default FilesList