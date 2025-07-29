import { useState } from "react"
import InputGroup from "../components/InputGroup"

function Signup(){
    const [username,setUsername] = useState("");

    return(
        <form>
        <InputGroup
            title="username"
            type="text"
            value={username}
            setValue={setUsername}
        
        />


    </form>


    )
    
}

export default Signup