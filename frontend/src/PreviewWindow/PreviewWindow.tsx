import { useContext,useRef } from "react"
import { PreviewContext } from "../PreviewProvider"
import './PreviewWindow.css'
import axios from "axios"
import { AuthContext } from "../AuthProvider"
function PreviewWindow(){
    const {fileData,setFileData} = useContext(PreviewContext)!
    const {authUser} = useContext(AuthContext)!

    

    if(!fileData) return null

    const onCloseClick=()=>{
        setFileData(null)
    }

    const onDownloadClick=async()=>{
        const response = await axios.get(`http://localhost:3000/files/${authUser?.username}/presigned/${fileData.Key}?download=true`)
        const url = response.data.url
        const link = document.createElement('a');
        link.href= url
        link.download = fileData.fileName
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)
        console.log(response.data.url)
        
    }

    return(
        
        <div className="preview-container">
            
            <div className="preview-header">
                <div className="preview-header__top">
                    <button onClick={onCloseClick}>close</button>
                    <div>
                        <span>{fileData.fileName}</span>
                        <span>{fileData.fileType}</span>
                    </div>

                </div>


                <div className="preview-header__bottom">
                    <button onClick={onDownloadClick}>Download</button>
                </div>
                
            </div> 

            <div className="preview-file">
                <img src={fileData.presignedUrl!} alt="" />
            </div>

            

        </div>
        
     
    )
}

export default PreviewWindow