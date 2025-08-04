

import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthProvider'
import SideHeader from './SideHeader/SideHeader';
import InfoBar from './InfoBar/InfoBar';
import MainContainer from './MainContainer/MainContainer';
import PreviewWindow from './PreviewWindow/PreviewWindow';

function App() {
  const navigate = useNavigate();
  
  const  {isAuthenticated} = useContext(AuthContext)!
  const [isHidden, setIsHidden] = useState<boolean>(false);
  useEffect(()=>{
    const checkAuth = ()=>{
      if(isAuthenticated === false){
        navigate('/login')
      }
    }
    checkAuth();
  },[isAuthenticated])

  if(isAuthenticated === null) return null;

  return (
    <>
   
        <SideHeader setIsHidden={setIsHidden}/>
   
        <InfoBar isHidden ={isHidden}/>

        <MainContainer
          children = {<Outlet/>}
        />
        <PreviewWindow
        />
      
    </>
  )
}

export default App
