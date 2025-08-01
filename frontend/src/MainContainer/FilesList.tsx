import axios from "axios"
import { useEffect, useState } from "react"

function FilesList(){


    const [filesList,setFilesList] = useState([]);
    useEffect(()=>{
        const fetchFiles = async()=>{
            
            const response = await axios.get('http://localhost:3000/files/directory',{withCredentials:true})
            console.log(response.data)
            setFilesList(response.data.files)
            
            
        }
        fetchFiles();
    },[filesList])



    return(<>
        {filesList.map((file)=>{
            return (
                <span>{file}</span>
            )
        })}
    
    </>)
}

export default FilesList