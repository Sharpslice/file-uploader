import './SideHeader.css'
function SideHeader(){
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
              <button >
                  <img src="/assets/hide-sidebar-horiz.svg" alt="" />
              </button>
          </div>
        </div>


    )
}

export default SideHeader;