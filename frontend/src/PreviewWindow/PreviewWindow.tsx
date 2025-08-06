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
                    <button>download</button>
                </div>
                
            </div> 

            <div className="preview-file">
                <img src={fileData.presignedUrl!} alt="" />
            </div>

            

        </div>
        
     
    )
}

export default PreviewWindow