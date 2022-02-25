import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'
import './cointopright.css'
import React from 'react'
import { Modal } from 'react-bootstrap';
import { logout, convertYocto, flip,NotificationError, gettxsRes, menusayings, hoverEmojis} from './utils'
import { NotLogged, Loading, RecentPlays } from './components/logged';

import ParasLogoB from './assets/paras-black.svg';
import ParasLogoW from './assets/paras-white.svg';
import LOGOMAIN from './assets/nearcoin.png';
import LOGODOG from './assets/nearcoindoggo.png';
import { useSearchParams, useNavigate} from "react-router-dom";

import { Twitter, Discord, Sun , Moon} from 'react-bootstrap-icons';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'testnet')
const doggochance= 0.05;


//import { ThemeProvider } from 'styled-components';
function genrandomphrase() {
  return menusayings[Math.floor(Math.random()*menusayings.length)];
}

export default function App() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  //
  const [calledContract, setCalledContract] = React.useState(false)

  // on the top right
  const [balance, setbalance] = React.useState("")


  // Dark Theme
  const [darkMode, setDarkMode] = React.useState("light")

  //
  const [tailsHeads, setTailsHeads] = React.useState("")

  // surprise phrase
  const [surprisePhrase, setSurprisePhrase] = React.useState(genrandomphrase())

  //
  const [ammoutNEAR, setammout] = React.useState("")
 
  const toogleHeadsTails = () => {


    
  }

  const [txsHashes, settxsHash] = React.useState(searchParams.get("transactionHashes"));

  const [txsResult, settxsResult] = React.useState("");

  //popup
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  const [showDoggo, setShowDogo] = React.useState(false);

  const calledContractHandler = (arg) => {
    setTailsHeads("");
    setCalledContract(arg)
  }

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

  const navigate = useNavigate()
  const resetGame = () => {
    setTailsHeads("")
    settxsHash("")
    settxsResult("")
    

    searchParams.delete("transactionHashes")
    navigate(searchParams.toString());
  }

  
  const getTxsResult = async () => {
    let decodedstr = ""
    await gettxsRes(txsHashes).then(res => {
      setShowNotification(true)

      let decoded = Buffer.from(res.status.SuccessValue, 'base64')
      
      //each element of decoded contains de ASCII value of the character
      decodedstr = decoded.toString('ascii')
    }).catch(e => {
      console.log(e)
    })
    console.log(decodedstr)
    settxsResult(decodedstr);
  }
  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      checkifdoggo();

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
        
        getTxsResult(txsHashes);
        console.log(txsResult)
      } 

    },

    //! The second argument to useEffect tells React when to re-run the effect
    //! Use an empty array to specify "only run on first render"
    //! This works because signing into NEAR Wallet reloads the page
    []
  )

  const checkifdoggo = () => {
    let random = Math.random()
    if (random < doggochance) {
      setShowDogo(true);
    }
  }
  
  return (
    <div className={darkMode}>
      {showNotification && <Notification />}
      <div className='social-icons'>
        <div className='d-flex flex-row flex-sm-column justify-content-start align-items-center h-100'>
          <div className='mt-3 d-flex flex-column shortcut-row'>
            <div className='d-flex flex-row mb-2 toolbar'>

              <div role='button' class='retro-btn danger'>
                <a class='buttoncool'> 
                  <span class='btn-inner'>
                    <span class='content-wrapper'>
                      <span class='btn-content'>
                        <span class='btn-content-inner' label="ON FIRE">
                        </span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
              <div role='button' class='retro-btn'>
                <a class='buttoncool'> 
                  <span class='btn-inner'>
                    <span class='content-wrapper'>
                      <span class='btn-content'>
                        <span class='btn-content-inner' label="WHO'S PLAYIN">
                        </span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
              <div role='button' class='retro-btn info'>
                <a class='buttoncool'> 
                  <span class='btn-inner'>
                    <span class='content-wrapper'>
                      <span class='btn-content'>
                        <span class='btn-content-inner' label="TOP PLAYERS">
                        </span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>

              { !window.walletConnection.isSignedIn() ? <></>: <><div className="ms-3 profile-picture-md"><img className="image rounded-circle cursor-pointer border border-2" src="https://i.imgur.com/E3aJ7TP.jpg" alt="" onClick={handleShow}/>
              </div>
              <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                  <Modal.Body className='p-0' style={{color:"black"}}>
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
                      <button className='w-80 mt-3 ms-3 me-3 wallet-adapter-button justify-content-center mx-auto btnhover' style={{fontFamily:"VCR_OSD_MONO", fontWeight:"normal", fontSize:"20px"}} onClick={handleClose}>Save</button>
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
          {txsHashes? 
          <>
            {txsResult==="" ? <Loading/> :
            <>
              {txsResult==="true" ?
              <div>
                
                YOU WON!
              </div>
              :
              <div>
                You lost bro.
              </div>
            }
            <button className='btn' onClick={resetGame}>
                {txsResult==="true" ? "Play Again" : "Try Again"}
              </button>
            </>
            }
          </>  :
          <div className='menumain' style={ !window.walletConnection.isSignedIn() ? {maxWidth:"870px"}: {maxWidth:"550px"}}>
          

          <h1 className="textsurprese font-weight-normal" style={{fontSize:"2rem"}}>{surprisePhrase}</h1>
          <div className='maincenter text-center'>

          { !window.walletConnection.isSignedIn() ? 
          <>
            <img src={showDoggo ? LOGODOG : LOGOMAIN} className="logo mb-2 mx-auto" alt="logo" width="224" height="224"/>
            <NotLogged/>
          </> :
          <div className='d-flex flex-column '>
            <h4 className='mt-1 mt-sm-1'>I choose...</h4>
            
            <img src={showDoggo ? LOGODOG : LOGOMAIN} className="logo mb-2 mx-auto" alt="logo" width="224" height="224"/>
            <div id="game" class="game">
                <h4 className="start text-uppercase">insert coin</h4>
              </div>
            <div className="row">
              <div className="col-4">
                <button className="button button-retro is-warning">0.5 NEAR</button>
              </div>
              <div className="col-4">
                <button className="button button-retro is-warning">1 NEAR</button>

              </div>
              <div className="col-4">
                <button className="button button-retro is-warning">25 NEAR</button>

              </div>
              
            </div>
            <div className="row my-3">
              <div className="col-4">
              <button className="button button-retro is-warning">50 NEAR</button>

              </div>
              <div className="col-4">
              <button className="button button-retro is-warning">75 NEAR</button>

              </div>
              <div className="col-4">
              <button className="button button-retro is-warning">100 NEAR</button>

              </div>
            </div>

          
          <button
              onClick={event => {
                setButtonDisabled(true)
                setammout("10")
                let ammoutNEAR = "10";
                calledContractHandler(true);
                flip(tailsHeads==="heads", ammoutNEAR)
                
                /*code doesnt reach here*/
              }}
              disabled={buttonDisabled || tailsHeads==="" /*|| ammoutNEAR==="" also need to have the ammount selected*/}
                >Flip!</button>
            
          </div>
          }
          </div>
          </div>
        }
        </div>
      </div>
      <div className="social-icons-bottom-right">
        <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100"><div className="mt-3 d-flex flex-column shortcut-row">
          <div className="text-center justify-content-center d-flex">
            <a href="" target="_blank" rel="" className="cursor-pointer me-2">
              {darkMode==="light" ? 
              <img src={ParasLogoW} alt="Paras Logo W " className='rounded mt-1 fa-nearnfts' style={{height:"28px",width:"28px"}} /> : <img src={ParasLogoB} alt="Paras Logo B" className='rounded mt-1 fa-nearnfts' style={{height:"28px",width:"28px"}}
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
            {/*}
              <button className="ms-2 btn btn-outline-dark" style={{fontSize:"0.7rem"}} >
                {darkMode==="light" ? "DARK" : "LIGHT"} {darkMode==="light" ? <Moon className="fa-xs fas mb-1"/>: <Sun className="fa-xs fas mb-1"/> }
      </button>*/}
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = "https://explorer."+networkId+".near.org/accounts"
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      <span style={{color:"#f5f5f5"}}>called method in contract:</span> 
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