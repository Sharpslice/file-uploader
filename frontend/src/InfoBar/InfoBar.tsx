type InfoBarProps =
{
    isHidden: boolean
}

function InfoBar({isHidden}: InfoBarProps){
    return(
        <div className= {isHidden?"info-bar hidden":"info-bar"}>
            info
        </div>
    )
}

export default InfoBar;