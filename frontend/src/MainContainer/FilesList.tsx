import axios from "axios"
import { useEffect, useState } from "react"
import './FilesList.css'
function FilesList(){


    const [filesList,setFilesList] = useState([]);
    useEffect(()=>{
        const fetchFiles = async()=>{
            
            const response = await axios.get('http://localhost:3000/files/directory',{withCredentials:true})
            console.log(response.data)
            setFilesList(response.data.files)
            
            
        }
        fetchFiles();
    },[])



    return(<>
        <div className="file-list">
            {filesList.map((file)=>{
                return (
                 <a key = {file} href={`http://localhost:3000/files/uploads/${file}.png`}>
                    {file}
                </a>
                 )
             })}
            
        </div>
        
    </>)
}

export default FilesList