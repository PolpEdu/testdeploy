import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import NearLogo from './assets/logo-black.svg';
import { useSearchParams, useNavigate} from "react-router-dom";



import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  let msg = "";
  if(searchParams.get("errorCode")) {
    msg = searchParams.get("errorCode")+ ", "+(searchParams.get("errorMessage").replaceAll("%20"," "))+".";
  }

  const[errormsg, setErrormsg] = React.useState(msg);

  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = React.useState()

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {


        searchParams.delete("errorCode");
        searchParams.delete("errorMessage");
        navigate(searchParams.toString());

        // window.contract is set by initContract in index.js
        window.contract.getGreeting({ accountId: window.accountId })
          .then(greetingFromContract => {
            setGreeting(greetingFromContract)
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
    console.log(errormsg);
    return (
      <div className='dark'>
        <main>
        {errormsg && <NotificationError err={errormsg}/>}
        yo

        
        <div className="mt-2 mb-3">
              <button className='wallet-adapter-button justify-content-center mx-auto' onClick={login}>Connect Wallet<img src={NearLogo} alt="Near Logo" className='nearlogo mb-1' style={{width:"40px", height:"40px"}}/></button>
        </div>
      </main>
      </div>
      
    )
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <div className="container-fluid">
        <div className="row content">
          <div className="col-sm-3 sidenav">
            <h4>John's Blog</h4>
            <ul className="nav nav-pills nav-stacked">
              <li className="active"><a href="#section1">Home</a></li>
              <li><a href="#section2">Friends</a></li>
              <li><a href="#section3">Family</a></li>
              <li><a href="#section3">Photos</a></li>
            </ul><br></br>
            <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </span>
            </div>
          </div>

        <div className="col-sm-9">
          <h4><small>RECENT POSTS</small></h4>
          <hr/>
          <h2>I Love Food</h2>
          <h5><span className="glyphicon glyphicon-time"></span> Post by Jane Dane, Sep 27, 2015.</h5>
          <h5><span className="label label-danger">Food</span> <span className="label label-primary">Ipsum</span></h5><br></br>
          <p>Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <br></br>
          
          <h4><small>RECENT POSTS</small></h4>
          <hr/>
          <h2>Officially Blogging</h2>
          <h5><span className="glyphicon glyphicon-time"></span> Post by John Doe, Sep 24, 2015.</h5>
          <h5><span className="label label-success">Lorem</span></h5><br></br>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <hr/>

          <h4>Leave a Comment:</h4>
          <form role="form">
            <div className="form-group">
              <textarea className="form-control" rows="3" required></textarea>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
          <br></br>
          
          <p><span className="badge">2</span> Comments:</p><br></br>
          
          <div className="row">
            <div className="col-sm-2 text-center">
              <img src="bandmember.jpg" className="img-circle" height="65" width="65" alt="Avatar"/>
            </div>
            <div className="col-sm-10">
              <h4>Anja <small>Sep 29, 2015, 9:12 PM</small></h4>
              <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <br></br>
            </div>
            <div className="col-sm-2 text-center">
              <img src="bird.jpg" className="img-circle" height="65" width="65" alt="Avatar"/>
            </div>
            <div className="col-sm-10">
              <h4>John Row <small>Sep 25, 2015, 8:25 PM</small></h4>
              <p>I am so happy for you man! Finally. I am looking forward to read about your trendy life. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <br></br>
              <p><span className="badge">1</span> Comment:</p><br></br>
              <div className="row">
                <div className="col-sm-2 text-center">
                  <img src="bird.jpg" className="img-circle" height="65" width="65" alt="Avatar"/>
                </div>
                <div className="col-xs-10">
                  <h4>Nested Bro <small>Sep 25, 2015, 8:28 PM</small></h4>
                  <p>Me too! WOW!</p>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <footer className="container-fluid">
    <p>Footer Text</p>
  </footer>
  
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
      called method: 'setGreeting' in contract:
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


function NotificationError(props) {
  const urlPrefix = "https://explorer."+networkId+".near.org/accounts";

  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      tried to call a method in Contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div className='err'>❌ Error: <span style={{color: "white"}}>{props.err}</span></div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
