import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Signup from './credentials/Signup.tsx'
import Login from './credentials/Login.tsx'
import {AuthProvider} from './AuthProvider.tsx'


const route = createBrowserRouter([
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/",
      element: <App/>,
      children:[


      ]
    }


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router = {route}/>
    </AuthProvider>
    
  </StrictMode>
)
