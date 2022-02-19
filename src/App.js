import 'regenerator-runtime/runtime'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { logout, toggleDarkMode, convertYocto } from './utils'
import { Twitter, Discord, Sun} from 'react-bootstrap-icons';

import ParasLogo from './assets/paras-black.svg';

import { NotLogged, Loading } from './components/logged';
import getConfig from './config'

const { networkId } = getConfig(process.env.NODE_ENV || 'development')


export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, set_greeting] = React.useState()

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  // 
  const [showTransactiom,  setshowTransaction] = React.useState(false)

  // check if won
  const [wonCoinFlip, setWonCoinFlip] = React.useState(false)

  // night mode
  const [nightMode, setNightMode] = React.useState("light")

  // on the top right
  const [balance, setbalance] = React.useState("")


  //popup
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        window.walletConnection.account().getAccountBalance().then(function(balance) {
          let fullstr = convertYocto(balance.available);
          let split = fullstr.split(".");
          let str = split[0] + "." + split[1].substring(0,4);
          setbalance("NEAR: "+ str); 
        }).catch(e => {
          console.log('There has been a problem with getting your balance: ' + e.message);
          setbalance("Couldn't Fetch Balance") ;
        });

        // window.contract is set by initContract in index.js
        window.contract.get_greeting({ account_id: window.accountId }) //using the contract to get the greeting
          .then(greetingFromContract => {
            set_greeting(greetingFromContract)
          })
      }
    },

    //! The second argument to useEffect tells React when to re-run the effect
    //! Use an empty array to specify "only run on first render"
    //! This works because signing into NEAR Wallet reloads the page
    []
  )

  return (
      <div className='light'>
        <div className='social-icons'>
          <div className='d-flex flex-row flex-sm-column justify-content-start align-items-center h-100'>
            <div className='mt-3 d-flex flex-column shortcut-row'>
              <div className='d-flex flex-row mb-2 toolbar'>

                <a href="#" className="ms-2"><button className="btn btn-dark btnhover" style={{fontSize:"0.8rem"}}><span className="d-none d-sm-inline-flex ">WHO'S PLAYIN ❓</span></button></a>
                <a href="#" className="ms-2"><button className="btn btn-dark btnhover" style={{fontSize:"0.8rem"}}><span className="d-none d-sm-inline-flex ">ON FIRE 🔥</span></button></a>
                <a href="#" className="ms-2"><button className="btn btn-dark btnhover" style={{fontSize:"0.8rem"}}><span className="d-none d-sm-inline-flex">TOP PLAYERS 🏆</span></button></a>


                { !window.walletConnection.isSignedIn() ? <></>: <><div className="ms-3 profile-picture-md"><img className="image rounded-circle cursor-pointer border border-2" src="https://i.imgur.com/E3aJ7TP.jpg" alt="" onClick={handleShow}/></div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Title className='mx-auto mt-2'>Modal heading</Modal.Title>
                    <Modal.Body>
                      <div className='d-flex flex-column'>
                        <span> Woohoo, you're reading this text in a modal!</span>
                    
                        <button className='btn p-2' onClick={handleClose}>Save</button>
                        <button className='btn p-2' onClick={logout}>Sign Out</button>
                      </div>
                    </Modal.Body>
                </Modal>
                  </>
                  }
              </div>
              {window.walletConnection.isSignedIn()? <h6 className="mt-1 balance-text mb-0">{balance ==="" ? <Loading/> : balance}</h6>:<></>}

            </div>
          </div>
        </div>
        <div className='text-center body-wrapper h-100vh h-100'>
          <div className='menumain'>
           <h1 style={{fontSize:"3rem"}}><strong>Near Coin Flip!</strong></h1>
           <div className='maincenter text-center'>
            <img className="rounded-circle" src="https://cdn.discordapp.com/attachments/416647772943679488/938502348010029086/qr-code.png" alt="logo" width="256" height="256"/>
            { !window.walletConnection.isSignedIn() ? 
            <NotLogged/> : <>
              <main>
                <h1>
                  <label
                    htmlFor="greeting"
                    style={{
                      color: 'var(--secondary)',
                      borderBottom: '2px solid var(--secondary)'
                    }}
                  >
                    {greeting}
                  </label>
                  {' '/* React trims whitespace around tags; insert literal space character when needed */}
                  {window.accountId}!
                </h1>
                <form onSubmit={async event => {
                  event.preventDefault()

                  // get elements from the form using their id attribute
                  const { fieldset, greeting } = event.target.elements

                  // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
                  const newGreeting = greeting.value

                  // disable the form while the value gets updated on-chain
                  fieldset.disabled = true

                  try {
                    // make an update call to the smart contract
                    await window.contract.set_greeting({
                      // pass the value that the user entered in the greeting field
                      message: newGreeting
                    })
                  } catch (e) {
                    alert(
                      'Something went wrong! ' +
                      'Maybe you need to sign out and back in? ' +
                      'Check your browser console for more info.'
                    )
                    console.log(e)
                    throw e
                  } finally {
                    // re-enable the form, whether the call succeeded or failed
                    fieldset.disabled = false
                  }

                  // update local `greeting` variable to match persisted value
                  set_greeting(newGreeting)

                  // show Notification
                  setShowNotification(true)

                  
                  // remove Notification again after css animation completes
                  // this allows it to be shown again next time the form is submitted
                  setTimeout(() => {
                    setShowNotification(false)
                  }, 11000)
                }}>
                  <fieldset id="fieldset">
                    <label
                      htmlFor="greeting"
                      style={{
                        display: 'block',
                        color: 'var(--gray)',
                        marginBottom: '0.5em'
                      }}
                    >
                      Change greeting
                    </label>
                    <div style={{ display: 'flex' }}>
                      <input
                        autoComplete="off"
                        defaultValue={greeting}
                        id="greeting"
                        onChange={e => setButtonDisabled(e.target.value === greeting)}
                        style={{ flex: 1 }}
                      />
                      <button
                        disabled={buttonDisabled}
                        style={{ borderRadius: '0 5px 5px 0' }}
                      >
                        Save
                      </button>
                    </div>
                  </fieldset>
                </form>
                <hr />

                <button
                onClick={async event => {
                  setButtonDisabled(true)

                  //transact("polpedu.testnet", '1.5')


                  setButtonDisabled(false)


                  // show Notification
                  setshowTransaction(true)

                  
                  // remove Notification again after css animation completes
                  // this allows it to be shown again next time the form is submitted
                  setTimeout(() => {
                    setshowTransaction(false)
                  }, 11000)
                  
                  
                }}
                disabled={buttonDisabled}
                  >test transaction</button>

                <button
                onClick={async event => {
                  setButtonDisabled(true)



                  try {
                    if (window.walletConnection.isSignedIn()) {
                      window.contract.gen_game({ account_id_p1: window.accountId,  account_id_p2: "polpedu.testnet"}); 
                    }
                  } catch(e) {
                    console.log(e)    
                  }

                  setButtonDisabled(false)
                }}

                disabled={buttonDisabled}
                  >Test Game</button>
              </main>
              {showNotification && <Notification />}
            </>
            }
            </div>
            
          </div>
          <h1 className="mt-2" style={{fontSize:"2.3rem"}}>RECENT PLAYS</h1>
          <div className="accordion text-center mb-2" id="myAccordion">
            <h6 className="mt-3" style={{transition:"color 0.4 ease-in-out"}}>
              <small style={{fontSize:"0.8rem", letterSpacing:"0.005rem"}}>
                <a href="#">wtf is this shit</a> | <a href="#">bro i have a question.</a> | <a href="#">Tutorial pls</a> | <a href="#" >TestNet Demo</a> | <a href="#">Am I dumb?</a>
              </small>
          </h6>
          </div>
        </div>
        <div className="social-icons-bottom-right">
          <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100"><div className="mt-3 d-flex flex-column shortcut-row">
            <div className="text-center justify-content-center d-flex">
              <a href="" target="_blank" rel="" className="cursor-pointer me-2">
                <img src={ParasLogo} alt="Paras Logo" className='rounded mt-1 fa-nearnfts' style={{height:"31px",width:"31px"}} />
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

                <button className="ms-2 btn btn-outline-dark" style={{fontSize:"0.7rem"}} onClick={toggleDarkMode}>
                  DARK <Sun className="fa-xs fas mb-1"/>
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



function rngTest() {
  console.log("Starting!")
  var i = 0;
  var dict = {};
  var min = 50;
  var max = 50;

  if (window.walletConnection.isSignedIn()) {
    setTimeout(function next() {


      window.contract.resultslog() //using the contract to get the greeting
      .then(result => {      
        let ft = result[0];
        console.log("it."+i + ": " +ft);

        if(dict[ft] === undefined) {
          dict[ft] = 1;
        } else {
          dict[ft] = dict[ft] + 1;
        }



        if(ft>max) {
          max = ft;
        }
        else if(ft<min) {
          min = ft;
        }




        if(i%10===0) {
          console.log("max: " + max);
          console.log("min: " + min);
          console.log(dict);
          
        }
      })
      .catch(e => {
        console.log(e)
      });

      i++;

      setTimeout(next, 2500);
    
    }, 2500);
  
  }
}