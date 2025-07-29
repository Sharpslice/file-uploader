import { useState } from "react"
import InputGroup from "../components/InputGroup"
import axios from "axios";

function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const onHandleClick = async(e: React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        console.log(`${username}, ${password}`)

        await axios.post('http://localhost:3000/auth/signup',{username,password},{withCredentials:true})
        

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
        <button onClick={onHandleClick}>sign up</button>


    </form>


    )
    
}

export default Signup