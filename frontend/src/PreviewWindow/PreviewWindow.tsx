import { useContext } from "react"
import { PreviewContext } from "../PreviewProvider"

function PreviewWindow(){
    const {fileData} = useContext(PreviewContext)!
 
    if(!fileData) return null
    return(
        <>
            hello
        
        </>
    )
}

export default PreviewWindow