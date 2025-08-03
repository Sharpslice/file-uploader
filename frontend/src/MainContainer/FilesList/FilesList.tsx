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



    return(<>
        <div className="file-list">
            {filesList.map((file)=>{
                return (
                    <div key={file.Key}> 
                        {file.Key + file.LastModified}

                    </div>
                 )
             })}
            
        </div>
        
    </>)
}

export default FilesList