import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout, transact } from './utils'
import './global.css'

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

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        
        // window.contract is set by initContract in index.js
        window.contract.get_greeting({ account_id: window.accountId }) //using the contract to get the greeting
          .then(greetingFromContract => {
            set_greeting(greetingFromContract)
          })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <div className='social-icons'>
          <div>

          </div>
        </div>
        <div className='menumain'>
          <h3>Near Coin Flip!</h3>
        </div>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Select Wallet</button>
        </p>
      </main>
    )
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
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