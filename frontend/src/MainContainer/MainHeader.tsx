import { useContext } from 'react';
import './MainHeader.css'
import { AuthContext } from '../AuthProvider';

function MainHeader(){
    const {authUser} = useContext(AuthContext)!
    if(authUser=== null) return null
    return(
        <div className="main-header">
            <input placeholder='Search'/>


            <div>
                {authUser.username}
            </div>
        </div>



    )
}

export default MainHeader;