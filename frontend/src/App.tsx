

import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthProvider'

function App() {
  const navigate = useNavigate();
  
  const  {isAuthenticated} = useContext(AuthContext)!
   
  useEffect(()=>{
    const checkAuth = ()=>{
      if(isAuthenticated === false){
        navigate('/login')
      }
    }
    console.log(isAuthenticated)
    checkAuth();
  },[isAuthenticated])
 
  if(isAuthenticated === null) return null;

  return (
    <>
      <div> main</div>
      <Outlet/>
    </>
  )
}

export default App
