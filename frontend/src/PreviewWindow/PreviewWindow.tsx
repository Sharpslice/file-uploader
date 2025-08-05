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

                    <div className="preview-header__info">

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


                    <div className="preview-header__action-bar">
                        <button>download</button>
                    </div>
                    
                </div>  
                {/* <img src={fileData.presignedUrl!} alt="" /> */}

            </div>
        
        </>
    )
}

export default PreviewWindow