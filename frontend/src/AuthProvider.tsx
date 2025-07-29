import axios from "axios";
import { createContext, useEffect, useState } from "react";
import type {ReactNode} from 'react';


type AuthProviderProp={
    children: ReactNode
}

type AuthContextType ={
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null> (null);
function AuthProvider({children} :AuthProviderProp ){

    
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    useEffect(()=>{
        const checkAuth=async()=>{
            try{
                const response = await axios.get('http://localhost:3000/auth/checkauth',{withCredentials:true})
                console.log(response.data.message)
                setIsAuthenticated(true)
            }
            catch(error: unknown){
                console.error(error)
                console.log('error')
                setIsAuthenticated(false)
                
            }
            
            
        }
        
        checkAuth();
    })

    return(
       <AuthContext.Provider value ={{isAuthenticated,setIsAuthenticated}}>
        {children}

       </AuthContext.Provider>


    )
}

export  {AuthProvider,AuthContext};