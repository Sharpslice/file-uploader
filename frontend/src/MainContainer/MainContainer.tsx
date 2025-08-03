import {useState, type ReactNode} from 'react'
import MainHeader from './MainHeader'
import axios from 'axios'
import FilesList from './FilesList/FilesList'

type MainContainerProps ={
    children :ReactNode
}

function MainContainer({children}: MainContainerProps){
    const [file,setFile] = useState<File | null>(null)
   

    const onUploadChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(!file) return;

        setFile(file)
    }

    const onFormClick = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
         const formData = new FormData();
         if(file){
            formData.append('random-file',file)
            console.log('uploading')
            await axios.post('http://localhost:3000/files/photo/upload',formData,{withCredentials:true})
         }
         
    }
    return(
        <div className="main-container">
            <MainHeader/>
            main

            <form>
                <input 
                    type="file"
                    name = 'random-file'
                    onChange={onUploadChange}
                
                />
                <button onClick={(e)=>onFormClick(e)}>upload</button>
            </form>




            <FilesList/>

            {children}
        </div>

    )
}

export default MainContainer