import axios from "axios"
import { useEffect } from "react"

function FilesList(){

    useEffect(()=>{
        const fetchFiles = async()=>{
            
            const response = await axios.get('http://localhost:3000/files/directory',{withCredentials:true})
            console.log(response.data)
            
            
            
        }
        fetchFiles();
    },[])



    return(<>
        {"files Here"}
    
    </>)
}

export default FilesList