import axios from "axios";
import { createContext, useEffect, useState } from "react";
import type {ReactNode} from 'react';


type AuthProviderProp={
    children: ReactNode
}
type AuthUser = {
    id: number
    password: string
    username: string
}
type AuthContextType ={
    isAuthenticated: boolean | null
    setIsAuthenticated: (value: boolean | null) => void 
    authUser: AuthUser | null
}


const AuthContext = createContext<AuthContextType | null> (null);
function AuthProvider({children} :AuthProviderProp ){
    const [isAuthenticated,setIsAuthenticated] = useState<boolean | null>(null)
    const [authUser,setAuthUser] = useState<AuthUser | null>(null) 
    useEffect(()=>{
        const checkAuth=async()=>{
            try{
                const response = await axios.get('http://localhost:3000/auth/checkauth',{withCredentials:true})
                
                setIsAuthenticated(true)
                setAuthUser(response.data.user)
                console.log(response.data.message)
            }
            catch(error: unknown){
                console.error(error)
                console.log('authentification denied')
                setIsAuthenticated(false)
                
            }
            
            
        }
        
        checkAuth();
    },[])

    return(
       <AuthContext.Provider value ={{isAuthenticated,setIsAuthenticated,authUser}}>
        {children}

       </AuthContext.Provider>


    )
}

export  {AuthProvider,AuthContext};