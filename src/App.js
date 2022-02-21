import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'
import React from 'react'
import { Modal } from 'react-bootstrap';
import { logout, convertYocto, flip,NotificationError, getlastFlip, menusayings, hoverEmojis} from './utils'
import { NotLogged, Loading, RecentPlays } from './components/logged';

import ParasLogoB from './assets/paras-black.svg';
import ParasLogoW from './assets/paras-white.svg';
import LOGOMAIN from './assets/unknown.png';

import { Twitter, Discord, Sun , Moon} from 'react-bootstrap-icons';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

//import { ThemeProvider } from 'styled-components';



function genrandomphrase() {
  return menusayings[Math.floor(Math.random()*menusayings.length)];
}

function genrandomemoji() {
  return hoverEmojis[Math.floor(Math.random()*hoverEmojis.length)].toString();
}

export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, set_greeting] = React.useState()

  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  // 
  const [showTransactiom,  setshowTransaction] = React.useState(false)

  // check if won
  const [wonCoinFlip, setWonCoinFlip] = React.useState(false)

  // on the top right
  const [balance, setbalance] = React.useState("")


  // Dark Theme
  const [darkMode, setDarkMode] = React.useState("light")


  const [tailsHeads, setTailsHeads] = React.useState("")


  // surprise phrase
  const [surprisePhrase, setSurprisePhrase] = React.useState(genrandomphrase())

  //
  const [ammoutNEAR, setammout] = React.useState("")

  const [isHoveredL, setHoverL] = React.useState(false)

  const [isHoveredR, setHoverR] = React.useState(false)
  
  const toggleHoverL = () => {
    setHoverL(!isHoveredL);
  }

  const toggleHoverR = () => {
    setHoverR(!isHoveredR);
  }

  //popup
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const toogleDarkMode = () => {
    let newmode = darkMode === "light" ? "dark" : "light"
    setDarkMode(newmode)
  }

  const setHeads = () => {
    setTailsHeads("heads")
  }

  const setTails = () => {
    setTailsHeads("tails")
  }

  /**
   * try {
      if (window.walletConnection.isSignedIn()) {
        window.contract.gen_game({ account_id_p1: window.accountId,  account_id_p2: "polpedu.testnet"}); 
      }
    } catch(e) {
      console.log(e)    
    }
   */

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        window.walletConnection.account().getAccountBalance().then(function(balance) {
          let fullstr = convertYocto(balance.available).split(".");
          let str = fullstr[0] + "." + fullstr[1].substring(0,4);
          setbalance("NEAR: "+ str); 
        }).catch(e => {
          console.log('There has been a problem with getting your balance: ' + e.message);
          setbalance("Couldn't Fetch Balance");
         <NotificationError/>
        });

        // window.contract is set by initContract in index.js
        /*window.contract.get_greeting({ account_id: window.accountId }) //using the contract to get the greeting
          .then(greetingFromContract => {
            set_greeting(greetingFromContract)
          })*/

      }

    },

    //! The second argument to useEffect tells React when to re-run the effect
    //! Use an empty array to specify "only run on first render"
    //! This works because signing into NEAR Wallet reloads the page
    []
  )
  return (
    <div className={darkMode}>
      <div className='social-icons'>
        <div className='d-flex flex-row flex-sm-column justify-content-start align-items-center h-100'>
          <div className='mt-3 d-flex flex-column shortcut-row'>
            <div className='d-flex flex-row mb-2 toolbar'>

              <a href="#" className="ms-2"><button className="btn btn-dark btnhover" style={{fontSize:"0.8rem"}}><span className="d-none d-sm-inline-flex ">WHO'S PLAYIN ❓</span></button></a>
              <a href="#" className="ms-2"><button className="btn btn-dark btnhover" style={{fontSize:"0.8rem"}}><span className="d-none d-sm-inline-flex ">ON FIRE 🔥</span></button></a>
              <a href="#" className="ms-2"><button className="btn btn-dark btnhover" style={{fontSize:"0.8rem"}}><span className="d-none d-sm-inline-flex">TOP PLAYERS 🏆</span></button></a>

              { !window.walletConnection.isSignedIn() ? <></>: <><div className="ms-3 profile-picture-md"><img className="image rounded-circle cursor-pointer border border-2" src="https://i.imgur.com/E3aJ7TP.jpg" alt="" onClick={handleShow}/>
              </div>
              <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                  <Modal.Body className='p-0'>
                    <div className='d-flex flex-column '>
                      <div className="card-body text-center">
                        <h4 style={{fontWeight:"bold"}}>USER PROFILE</h4>
                      <h6>
                        <small style={{fontWeight:"semibold"}} className="w-30">Currently logged as:{window.accountId}!</small>
                      </h6>
                      <div className="profile-picture d-flex w-80 mb-3">
                        <div className="imageWrapper ms-auto me-auto">
                          <img className="rounded-circle cursor-pointer image-large" src="https://i.imgur.com/E3aJ7TP.jpg" alt="pfp"/>
                          <a href="#" className="cornerLink" ><small style={{fontSize:"0.75rem"}}>CHANGE PICTURE</small></a>
                          </div>
                        </div>
                          <h6>First Fliperino: </h6>
                          <div className="input-group">
                        
                        {/*<input type="text" className="form-control" placeholder="Nickname" aria-label="Username" aria-describedby="basic-addon1" value=""/>
                        */}
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <div className='d-flex  flex-column justify-content-center bg-light linetop' style={{margin:"0px"}}>
                      <button className='w-80 mt-3 ms-3 me-3 wallet-adapter-button wallet-adapter-button-trigger justify-content-center mx-auto btnhover' style={{fontFamily:"VCR_OSD_MONO", fontWeight:"normal", fontSize:"20px"}} onClick={handleClose}>Save</button>
                      <button className='btn w-80 mt-2 ms-3 me-3 rounded-2 btn-danger mb-3 ' onClick={logout} style={{fontWeight: "semibold", fontSize:"1.1rem"}}>Disconnect Wallet</button>
                  </div>
              </Modal>
                </>
                }
            </div>
            {window.walletConnection.isSignedIn() && <h6 className="mt-1 balance-text mb-0">{balance ==="" ? <Loading/> : balance}</h6>
            }

          </div>
        </div>
      </div>
      <div className='text-center body-wrapper h-100vh h-100'>
        <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
        <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
        <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
        <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
        <div className="toast-container position-absolute top-0 start-0 p-3 top-index"></div>
        <div className='play form-signin'>
          <div className='menumain' style={ !window.walletConnection.isSignedIn() ? {maxWidth:"479px"}: {maxWidth:"370px"}}>
          
          <h1 style={ window.walletConnection.isSignedIn() ? {fontSize:"1.3rem"} : {fontSize:"2rem"}}>{surprisePhrase}</h1>
          <div className='maincenter text-center'>
          <img src={LOGOMAIN} className="logo mb-3" alt="logo" width="126" height="126"/>
          
          { !window.walletConnection.isSignedIn() ? 
          <NotLogged/> :
          <div className='d-flex flex-column '>
            <h3 className='mt-1 mt-sm-2'>I choose...</h3>
            <div className="row mb-3">
              <div className="col-6">
                <button className={tailsHeads==="heads" ? "selected btn double-button w-100 h-100" : "btn double-button  w-100 h-100"} onClick={setHeads} onMouseEnter={toggleHoverL} onMouseLeave={toggleHoverL}>
                  <span style={{fontSize:"1.5rem", fontWeight:"bold"}}>{isHoveredL ? genrandomemoji() :"HEADS"}</span>
                </button>
              </div>
              <div className="col-6">
                <button className={tailsHeads==="tails" ? "selected btn double-button w-100 h-100" : "btn double-button  w-100 h-100"} onClick={setTails} onMouseEnter={toggleHoverR} onMouseLeave={toggleHoverR}>
                  <span style={{fontSize:"1.5rem", fontWeight:"bold"}}>{isHoveredR ? genrandomemoji() :"TAILS"}</span>
                </button>
              </div>
            </div>
            <h4>FOR</h4>
            <div className="row">
              <div className="col-4">
                <img className="cursor-pointer double-button" src="https://i.imgur.com/LnRn1mC.png" alt="0.05 sol" width="100%" height="100%"/>
              </div>
              <div className="col-4">
                <img className="cursor-pointer double-button" src="https://i.imgur.com/o6IEhiu.png" alt="0.1 sol" width="100%" height="100%"/>
              </div>
              <div className="col-4">
                <img className="cursor-pointer double-button" src="https://i.imgur.com/5lRVCML.png" alt="0.25 sol" width="100%" height="100%"/>
              </div>
              
            </div>
            <div className="row my-3">
              <div className="col-4">
                <img className="cursor-pointer double-button" src="https://i.imgur.com/iChJqD2.png" alt="0.5 sol" width="100%" height="100%"/>
              </div>
              <div className="col-4">
                <img className="cursor-pointer double-button" src="https://i.imgur.com/D8b7RNF.png" alt="1 sol" width="100%" height="100%"/>
              </div>
              <div className="col-4">
                <img className="cursor-pointer double-button" src="https://i.imgur.com/eS5gbgf.png" alt="2 sol" width="100%" height="100%"/>
              </div>
            </div>

          
          <button
              onClick={async event => {
                setButtonDisabled(true)
                setammout("10")
                let ammoutNEAR = "10";
                flip(tailsHeads==="heads", ammoutNEAR).catch( function(err) {
    <NotificationError/>

                }
                )


                setButtonDisabled(false)


                // show Notification
                setshowTransaction(true)

                
                // remove Notification again after css animation completes
                // this allows it to be shown again next time the form is submitted
                setTimeout(() => {
                  setshowTransaction(false)
                }, 11000)
                
                
              }}
              disabled={buttonDisabled || tailsHeads==="" /*|| ammoutNEAR==="" also need to have the ammount selected*/}
                >Flip!</button>
            
          </div>
          }
          </div>
          {showNotification && <Notification />}
          </div>
        </div>
        {!window.walletConnection.isSignedIn() && <RecentPlays/>}
      </div>
      <div className="social-icons-bottom-right">
        <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100"><div className="mt-3 d-flex flex-column shortcut-row">
          <div className="text-center justify-content-center d-flex">
            <a href="" target="_blank" rel="" className="cursor-pointer me-2">
              {darkMode==="light" ? 
              <img src={ParasLogoB} alt="Paras Logo B " className='rounded mt-1 fa-nearnfts' style={{height:"31px",width:"31px"}} /> : <img src={ParasLogoW} alt="Paras Logo W" className='rounded mt-1 fa-nearnfts' style={{height:"31px",width:"31px"}}
               />}
            </a>
            <a href="" target="_blank" rel="" className="cursor-pointer me-2">
              <Twitter color="#1da1f2" size={30} className="rounded mt-1 fa-twitter"/>
            </a>
            <a href="" target="_blank" rel="" className="cursor-pointer me-2">
                <Discord color="#5865f2" size={31} className="rounded mt-1 fa-discord"/>
            </a>
            </div>
          </div>
        </div>
      </div>
      <div className="social-icons-left">
        <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100">
          <div className="mt-3 d-flex flex-column">
            <div className="d-flex flex-row mb-2 toolbar">

              <button className="ms-2 btn btn-outline-dark" style={{fontSize:"0.7rem"}} >
                {darkMode==="light" ? "DARK" : "LIGHT"} {darkMode==="light" ? <Moon className="fa-xs fas mb-1"/>: <Sun className="fa-xs fas mb-1"/> }
              </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}