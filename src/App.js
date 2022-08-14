import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css'
import './global.css'
import './cointopright.css'
import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useSearchParams, useNavigate } from "react-router-dom"

import { logout, convertYocto, flip, gettxsRes, menusayings, fees, sendpostwithplay, startup } from './utils'
import { NotLogged, Loading } from './components/logged'
import FooterComponent from './components/FooterComponent'
import HeaderButtons from './components/HeaderComponents';
import LOGOMAIN from './assets/result.svg'
import LOGOBACK from './assets/nearcoin.svg'
import LOGODOG from './assets/nearcoindoggo.svg'
import getConfig from './config'

//for flips animation
import logoH from './assets/Coin Animation.mp4'
//import logoT from './assets/Coin Animation2.mp4'


const { networkId } = getConfig(process.env.NODE_ENV || 'testnet')
const doggochance = 0.05
export const urlPrefix = "https://explorer." + networkId + ".near.org/accounts"


function genrandomphrase() {
  return menusayings[Math.floor(Math.random() * menusayings.length)]
}


export default function App() {
  startup()

  img1 = new Image()
  img2 = new Image()
  img3 = new Image()

  img1.src = LOGOMAIN
  img2.src = LOGOBACK
  img3.src = LOGODOG
  const { width, height } = useWindowSize()

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)


  // Dark Theme
  const [darkMode, setDarkMode] = React.useState("light")

  const [tailsHeads, setTailsHeads] = React.useState(Math.random() < 0.5 ? "tails" : "heads")

  // surprise phrase
  const [surprisePhrase, setSurprisePhrase] = React.useState(genrandomphrase())

  const [ammoutNEAR, setammout] = React.useState("")

  const [ammountWon, setWonAmmount] = React.useState("")


  const [txsHashes, settxsHash] = React.useState(searchParams.get("transactionHashes"))

  let msg = ""
  if (searchParams.get("errorCode")) {
    msg = searchParams.get("errorCode") + ", " + (searchParams.get("errorMessage").replaceAll("%20", " ")) + "."
  }

  const [errormsg, setErrormsg] = React.useState(msg)

  const [showDoggo, setShowDogo] = React.useState(false)

  const [processing, setprocessing] = React.useState(false)

  const [didWon, setDidWon] = React.useState(false)


  const setPrice = (price) => {
    setammout(price)
  }


  const resetGame = () => {
    setTailsHeads(Math.random() < 0.5 ? "tails" : "heads")
    settxsHash("")
    setErrormsg("")
    setWonAmmount("")
    setDidWon(null)
    setprocessing(false)


    searchParams.delete("transactionHashes")
    searchParams.delete("errorCode")
    searchParams.delete("errorMessage")
    navigate(searchParams.toString())
  }



  const getTxsResult = async () => {
    let decodedWonAmmountstr = ""

    gettxsRes(txsHashes).then(res => {
      //console.log(res)
      setShowNotification(true)


      let decoded = Buffer.from(res.status.SuccessValue, 'base64').toString("ascii")
      setDidWon(decoded)

      let decodedWonAmmount = res.transaction.actions[0].FunctionCall.deposit / fees
      sendpostwithplay(txsHashes)

      try {
        decodedWonAmmountstr = convertYocto(decodedWonAmmount.toLocaleString('fullwide', { useGrouping: false }))
        setWonAmmount(decodedWonAmmountstr)

      } catch (e) {
        console.log("Error converting ammount bet to string.")
      }

      //console.log("decoded result: "+ decodedstr)

    }).catch(e => {
      if (!e instanceof TypeError) {
        console.error(e)
      }

    })

  }

  React.useEffect(
    () => {
      checkifdoggo()

      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        searchParams.delete("errorCode")
        searchParams.delete("errorMessage")
        navigate(searchParams.toString())

        getTxsResult(txsHashes)
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
      setShowDogo(true)
    }
  }

  const toggleHeadsTails = () => {
    if (tailsHeads === "heads") {
      setTailsHeads("tails")
    } else {
      setTailsHeads("heads")
    }
  }
  return (
    <div className={darkMode}>
      {showNotification && <Notification />}
      {errormsg && <NotificationError err={errormsg} ismult={false} />}
      <HeaderButtons />

      <div className='text-center body-wrapper h-100'>
        <div className='play form-signin'>
          {txsHashes ?
            <div className='maincenter text-center'>
              <FlipCoin result={tailsHeads} loading={false} won={didWon} width={width} height={height} reset={resetGame} />
            </div>
            :
            <div className='menumain' style={!window.walletConnection.isSignedIn() ? { maxWidth: "860px" } : { maxWidth: "650px" }}>


              <h1 className="textsurprese font-weight-normal" style={{ fontSize: "1.5rem" }}>{surprisePhrase}</h1>
              <div className='maincenter text-center'>

                {!window.walletConnection.isSignedIn() ?
                  <>
                    <img src={showDoggo ? LOGODOG : LOGOMAIN} className="logo mx-auto" alt="logo" width="240" height="240" />
                  </> :
                  <div className='d-flex flex-column '>
                    <h4 className='mt-1 mt-sm-1' fontSize="1.3rem">I like...</h4>

                    <div className="flip-box logo mb-2 mx-auto">
                      <div className={tailsHeads === "heads" ? "flip-box-inner" : "flip-box-inner-flipped"}>
                        <div className="flip-box-front">
                          <img src={showDoggo ? LOGODOG : LOGOMAIN} alt="logo" width="240" height="240" onClick={() => { toggleHeadsTails() }} />
                        </div>
                        <div className="flip-box-back">
                          <img src={LOGOBACK} alt="logoback" width="240" height="240" onClick={() => { toggleHeadsTails() }} />
                        </div>
                      </div>
                    </div>


                    <div id="game" className="game">
                      <h4 className="start text-uppercase mb-3">insert coin</h4>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <button className={ammoutNEAR === "0.5" ? "button button-retro is-selected" : "button button-retro is-warning"} onClick={() => setPrice("0.5")}>0.5 NEAR</button>
                      </div>
                      <div className="col-4">
                        <button className={ammoutNEAR === "1" ? "button button-retro is-selected" : "button button-retro is-warning"} onClick={() => setPrice("1")}>1 NEAR</button>
                      </div>
                      <div className="col-4">
                        <button className={ammoutNEAR === "2.5" ? "button button-retro is-selected" : "button button-retro is-warning"} onClick={() => setPrice("2.5")}>2.5 NEAR</button>

                      </div>

                    </div>
                    <div className="row mt-3">
                      <div className="col-4">
                        <button className={ammoutNEAR === "5.0" ? "button button-retro is-selected" : "button button-retro is-warning"} onClick={() => setPrice("5.0")}>5.0 NEAR</button>

                      </div>
                      <div className="col-4">
                        <button className={ammoutNEAR === "7.5" ? "button button-retro is-selected" : "button button-retro is-warning"} onClick={() => setPrice("7.5")}>7.5 NEAR</button>

                      </div>
                      <div className="col-4">
                        <button className={ammoutNEAR === "10" ? "button button-retro is-selected" : "button button-retro is-warning"} onClick={() => setPrice("10")}>10 NEAR</button>

                      </div>
                    </div>

                    <hr />
                    <button
                      className="button button-retro is-warning"
                      onClick={event => {
                        setButtonDisabled(true)
                        setprocessing(true)
                        //console.log(tailsHeads)
                        //console.log(ammoutNEAR)
                        flip(tailsHeads === "heads", ammoutNEAR)

                        /*code doesnt reach here*/
                      }}
                      disabled={buttonDisabled || tailsHeads === "" || ammoutNEAR === ""}
                    >{processing ? <Loading size={"1.5rem"} color={"text-warning"} /> : "Flip!"}</button>

                  </div>
                }
              </div>
            </div>
          }
        </div>
        {!window.walletConnection.isSignedIn() ? <NotLogged /> : <></>}
      </div>
      <FooterComponent />

    </div >
  )
}

// this component gets rendered by App after the form is submitted
export function Notification() {
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags insert literal space character when needed */}
      <span style={{ color: "#f5f5f5" }}>called method in contract:</span>
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contractSINGLE.contractId}`}>
        {window.contractSINGLE.contractId}
      </a>
      <footer>
        <div>Just now</div>
      </footer>
    </aside>
  )
}


export function NotificationError(props) {

  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags insert literal space character when needed */}
      tried to call a method in Contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${!props.ismult ? window.contractSINGLE.contractId : window.contractMULT.contractId}`}>
        {!props.ismult ? window.contractSINGLE.contractId : window.contractMULT.contractId}
      </a>
      <footer>
        <div className='err'>❌ Error: <span style={{ color: "white" }}>{props.err}</span></div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}

function FlipCoin(props) {
  const [processing, setprocessing] = React.useState(true)



  React.useEffect(() => {

    setTimeout(function () {
      setprocessing(false)
    }, 5000)
  }, [])

  res = () => {
    props.reset()
  }

  return (
    <>
      <div id="cointainer" className=''>
        <video autoPlay muted playsInline className="video-container d-flex justify-content-center flex-row borderpixelSMALL" style={{ marginTop: "3rem" }}>
          <source src={props.result === "heads" ? logoH : logoH} type="video/mp4" />
        </video>
      </div>
      <div className={processing === false ? 'fadein' : 'fadein fadeout'}>
        {props.won === "true" ? <>
          <Confetti
            width={props.width - 1}
            height={props.height - 1}
          />
          <div className="textinfowin font-weight-normal mb-2" style={{ fontSize: "2rem" }}>
            YOU WON!
          </div>
          <button className="button button-retro is-primary" onClick={res}>
            Play Again
          </button>
        </>
          :
          <>
            <div className="textinfolose font-weight-normal" style={{ fontSize: "2rem" }}>
              Game Over!
            </div>
            <button className="button button-retro is-error mb-2" onClick={this.res}>
              Try Again
            </button>
          </>
        }
      </div>
    </>
  )
}



