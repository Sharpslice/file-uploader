import type {ReactNode} from 'react'

type MainContainerProps ={
    children :ReactNode
}

function MainContainer({children}: MainContainerProps){
    return(
        <div className="main-container">
            main
            {children}
        </div>

    )
}

export default MainContainer