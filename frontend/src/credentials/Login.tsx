import axios from "axios";
import InputGroup from "../components/InputGroup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const {setIsAuthenticated} = useContext(AuthContext)!;
    const navigate = useNavigate();
    const onHandleClick = async(e: React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        console.log(`${username}, ${password}`)
        try{
            const response = await axios.post('http://localhost:3000/auth/login',{username,password},{withCredentials:true})
            console.log(response.data.message)
            setIsAuthenticated(true)
            navigate('/')
        }
        catch(error: unknown){
            console.log(error)
        }
        
    
    }
    const onSignupNavigate=(e: React.MouseEvent)=>{
        e.preventDefault();
        navigate('/signup')
    }


    return(
        
        <form>
        <InputGroup
            title="username"
            type="text"
            value={username}
            setValue={setUsername}

        />

        <InputGroup
            title="password"
            type="password"
            value={password}
            setValue={setPassword}

        />
        <button onClick={onHandleClick}>Log in</button>

        <button onClick={onSignupNavigate}>Sign up</button>
    </form>


    )
}

export default Login;