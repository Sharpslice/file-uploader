import './InfoBar.css'

type InfoBarProps =
{
    isHidden: boolean
}

function InfoBar({isHidden}: InfoBarProps){
    return(
        <div className= {isHidden?"info-bar hidden":"info-bar"}>
            <div className='info-bar__banner'>
                Home
            </div>

            <div className='info-bar__button-container'>
                
                <button className='info-bar__button'>
                    <img src="/assets/layers.svg" alt="" />
                    All Files
                </button>
            

            
                <button className='info-bar__button'>
                     <img src="/assets/photo.svg" alt="" />
                    Photos
                </button>
            

            
                <button className='info-bar__button'>
                    <img src="/assets/multi-users.svg" alt="" />
                    Shared
                </button>
                
            </div>
        </div>
    )
}

export default InfoBar;