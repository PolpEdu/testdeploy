import { connect, Contract, keyStores, WalletConnection, utils,providers } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')
let near;
let fcall;
const fees = 1.035128593432;

export const menusayings = [
  "Near Coin Flip!",
  "Want to play a game?",
  "Prepare to be flipped!",
  "Flip a coin!",
  "GIVE ME MY NEAR BACK!",
  "I'm a coin-flipping machine!",
  ">:((((((",
  "shhhhh, its tails bro trust me.",
  "fifty-fifty.",
  "It's Heads.\nSource: Trust me bro.",
  "Do you even Flip?",
  "Make a wish...",
  "Have you ever heard of PS,\nThe God of the Flips?"
]

export const hoverEmojis = [
  "🤔",
  "😳",
  "😱",
  "😏",
  "😍",
  "👉👈",
  "🤓",
  "🤠",
  "😎",
  "🤪",
  "🥶",
  "💪",
  "😀",
  "🙃",
  "😉",
  "😌",
  "😛",
  "😜",
  "😇",
]

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['get_greeting', 'coin_flip', 'resultslog', 'gen_game'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['set_greeting'],
    // Sender is the account ID to initialize transactions. It can be omitted if you want to send
    sender: window.walletConnection.account(), // account object to initialize and sign transactions.
  })
}

export function convertYocto(YOCTO){
  return utils.format.formatNearAmount(YOCTO);
}

export function getlastFlip(fcall) {
  if(fcall) {
    const result = providers.getTransactionLastResult(
      fcall
    );
    console.log(result);
    return result;
  }
  
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export function flip(args, ammoutNEAR, calledContractHandler) {
  let yoctoNEAR=  utils.format.parseNearAmount((ammoutNEAR*fees).toString());

  let contractID = process.env.CONTRACT_NAME || 'dev-1645468760160-26705510783939';
  const called = window.walletConnection.account().functionCall({contractId:contractID.toString(), methodName:'coin_flip', args:{option:args}, gas: "300000000000000",attachedDeposit:yoctoNEAR}).then(result => {
    console.log(result)
    console.log(called);
    calledContractHandler(false);
    return result;
  })
  .catch(e => {
    calledContractHandler(false);
    console.log(e)
  });
  
}

function NotificationError() {
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      Transaction failed.
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>❌ Error</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}



function NotificationTRANS(status) {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      Transfered:
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