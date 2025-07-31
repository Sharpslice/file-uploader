

import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthProvider'
import SideHeader from './SideHeader/SideHeader';

function App() {
  const navigate = useNavigate();
  
  const  {isAuthenticated} = useContext(AuthContext)!
   
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
   
        <SideHeader/>
   
        

        <div className='info-header'>
            hello
        </div>

        <div className='main-container'>
            Hello
        </div>
    
      <Outlet/>
    </>
  )
}

export default App
