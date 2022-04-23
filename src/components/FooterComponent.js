import React from 'react'
import ParasLogoB from '../assets/paras-black.svg';
import ParasLogoW from '../assets/paras-white.svg';
import { Twitter, Discord } from 'react-bootstrap-icons';

function FooterComponent() {
    const [darkMode, setDarkMode] = React.useState("dark")

    const toogleDarkMode = () => {
        let newmode = darkMode === "light" ? "dark" : "light"
        setDarkMode(newmode)
    }



    return (
        <> <div className="social-icons-bottom-right">
            <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100"><div className="mt-3 d-flex flex-column shortcut-row">
                <div className="text-center justify-content-center d-flex">
                    <a href="" target="_blank" rel="" className="cursor-pointer me-2">
                        <img src={ParasLogoW} alt="Paras Logo B" className='rounded mt-1 fa-nearnfts' style={{ height: "28px", width: "28px" }}
                        />
                    </a>
                    <a href="https://twitter.com/flipnear" target="_blank" rel="" className="cursor-pointer me-2">
                        <Twitter color="#1da1f2" size={30} className="rounded mt-1 fa-twitter" />
                    </a>
                    <a href="https://discord.gg/b7NJPuV5pk" target="_blank" rel="" className="cursor-pointer me-2">
                        <Discord color="#5865f2" size={31} className="rounded mt-1 fa-discord" />
                    </a>
                </div>
            </div>
            </div>
        </div>
            <div className="social-icons-left">
                <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100">
                    <div className="mt-3 d-flex flex-column">
                        <div className="d-flex flex-row mb-2 toolbar">
                            {/*}
              <button className="ms-2 btn btn-outline-dark" style={{fontSize:"0.7rem"}} >
                {darkMode==="light" ? "DARK" : "LIGHT"} {darkMode==="light" ? <Moon className="fa-xs fas mb-1"/>: <Sun className="fa-xs fas mb-1"/> }
      </button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterComponent