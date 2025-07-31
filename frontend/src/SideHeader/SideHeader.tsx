import './SideHeader.css'
import type { Dispatch, SetStateAction } from "react";
type SideHeaderProps={
    setIsHidden:  Dispatch<SetStateAction<boolean>>
}
function SideHeader({setIsHidden}: SideHeaderProps){

    const onCollapseClick = ()=>{
        console.log("collapse")
        setIsHidden(prev =>!prev)
    } 

    return(
        <div className='side-header'> 


            <div className="side_header__main-nav">
                <div className='side-header__button'>
                    <button>
                        <img src="/assets/home.svg"  alt="" />
                    </button>
                    <div>Home</div>
                </div>

                <div className='side-header__button'>
                    <button>
                            <img src="/assets/folder.svg" alt="" />
                    </button>
                    <div>Folders</div>
                </div>
            </div>
          





          <div className='side-panel__button'>
              <button onClick={onCollapseClick}>
                  <img src="/assets/hide-sidebar-horiz.svg" alt="" />
              </button>
          </div>
        </div>


    )
}

export default SideHeader;