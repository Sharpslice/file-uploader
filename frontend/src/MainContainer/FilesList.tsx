import axios from "axios"
import { useContext, useEffect, useState } from "react"
import './FilesList.css'
import { AuthContext } from "../AuthProvider";
function FilesList(){


    const [filesList,setFilesList] = useState([]);
    const {authUser} = useContext(AuthContext)!;
    useEffect(()=>{
        const fetchFiles = async()=>{
            
            const response = await axios.get(`http://localhost:3000/files/${authUser!.username}`,{withCredentials:true})
            console.log(response.data)
            setFilesList(response.data.files)
            
            
        }
        fetchFiles();
    },[authUser])



    return(<>
        <div className="file-list">
            {filesList.map((file)=>{
                return (
                    <div key={file}> 
                        {file}

                    </div>
                 )
             })}
            
        </div>
        
    </>)
}

export default FilesList