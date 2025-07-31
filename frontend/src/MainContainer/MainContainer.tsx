import type {ReactNode} from 'react'
import MainHeader from './MainHeader'

type MainContainerProps ={
    children :ReactNode
}

function MainContainer({children}: MainContainerProps){
    return(
        <div className="main-container">
            <MainHeader/>
            main
            {children}
        </div>

    )
}

export default MainContainer