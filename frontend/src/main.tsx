import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Signup from './credentials/Signup.tsx'
import Login from './credentials/Login.tsx'
import AuthProvider from './AuthProvider.tsx'


const route = createBrowserRouter([
    {
      path:"/",
      element: <Login/>,
    }


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router = {route}/>
    </AuthProvider>
    
  </StrictMode>
)
