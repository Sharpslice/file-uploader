import { useContext } from "react"
import { PreviewContext } from "../PreviewProvider"
import './PreviewWindow.css'
function PreviewWindow(){
    const {fileData,setFileData} = useContext(PreviewContext)!
 
    if(!fileData) return null

    const onCloseClick=()=>{
        setFileData(null)
    }

    return(
        <>
            <div className="preview-container">
                <div className="preview-header">
                    <button onClick={onCloseClick}>close</button>
                    <div className="preview-info">
                        <div>
                            {fileData.fileName}
                        </div>
                        <div>
                            {fileData.fileType}
                        </div>
                    </div>
                </div>  
                <img src={fileData.presignedUrl!} alt="" />

            </div>
        
        </>
    )
}

export default PreviewWindow