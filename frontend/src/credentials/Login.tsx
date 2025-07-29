import axios from "axios";
import InputGroup from "../components/InputGroup";
import { useState } from "react";

function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const onHandleClick = async(e: React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        console.log(`${username}, ${password}`)
        try{
            const response = await axios.post('http://localhost:3000/auth/login',{username,password},{withCredentials:true})
            console.log(response.data.message)
        }
        catch(error: unknown){
            console.log(error)
        }
        
    
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


    </form>


    )
}

export default Login;