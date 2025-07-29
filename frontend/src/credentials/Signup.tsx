import { useState } from "react"
import InputGroup from "../components/InputGroup"

function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    const onHandleClick = (e: React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        console.log(`${username}, ${password}`)


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