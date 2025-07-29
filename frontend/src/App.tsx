

import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthProvider'

function App() {
  const navigate = useNavigate();
  
  const  {isAuthenticated} = useContext(AuthContext)!
   
  useEffect(()=>{
    const checkAuth = ()=>{
      if(!isAuthenticated){
        navigate('/login')
      }
    }
    checkAuth();
  })
 
  
 
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
