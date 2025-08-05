import { createContext, useState } from "react"
import type { Dispatch, SetStateAction } from "react";
import type {FileData} from '../../shared/types/fileData'
type PreviewProviderProp ={
    children: React.ReactNode
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