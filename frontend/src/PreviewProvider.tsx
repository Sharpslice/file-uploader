import { createContext, useState } from "react"
import type { Dispatch, SetStateAction } from "react";
type PreviewProviderProp ={
    children: React.ReactNode
}
interface FileData{
    fileName: string
    fileType: string
    presignedUrl : string
}
interface PreviewContextValue{
    fileData: FileData | null
    setFileData: Dispatch<SetStateAction<FileData | null>>;
}

const PreviewContext = createContext<PreviewContextValue | null>(null)

function PreviewProvider({children}:PreviewProviderProp ){

    const [fileData,setFileData] = useState<FileData | null>(null)
   return (
   <>
    <PreviewContext.Provider value = {{fileData,setFileData}}>
        {children}
    </PreviewContext.Provider>
   </>
   
)
}
export {PreviewProvider,PreviewContext}