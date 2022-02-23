import { connect, Contract, keyStores, WalletConnection, utils,providers } from 'near-api-js'
import getConfig from './config'

let node_env = process.env.NODE_ENV || 'testnet';
console.log(node_env)
const nearConfig = getConfig(node_env)

let providerurl = "https://archival-rpc."+node_env+".near.org";
console.log(providerurl)
//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(providerurl);


let near;
const fees = 1.035128593432;

export const menusayings = [
  "Near Coin Flip!",
  "Want to play a game?",
  "Prepare to be flipped!",
  "Flip a coin!",
  "GIVE ME MY NEAR BACK!",
  "I'm a coin-flipping machine!",
  "*rawr*",
  "shhhhh, its tails bro trust me.",
  "fifty-fifty.",
  "It's Heads.\nSource: Trust me bro.",
  "Do you even Flip?",
  "Make a wish...",
  "The Legend of PS,\nThe God of the Flips.",
  "Might wanna double it...",
  "I'll phone a friend.",
  "Let me take a breath.",
  "What color do I want my lambo....",
  "See you in Dubai",
  "Fliperino the coinerino",
  "Poggers",
  "Flippin in the moon",
  "one sec, let me call drake brb"
]

export const hoverEmojis = [
  "🤔",
  "😳",
  "😱",
  "😏",
  "😍",
  "👌",
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
  "🔥",
  "💸",
  "💰",
  "🤩",
  "😮‍💨",
  "😬",
  "🙄",
  "😤",
  "💍",
  "🚀",
  "⛱️",
]

export const buttonReddem = [
  "I took the L",
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

export async function gettxsRes(txs) {
  const result = await provider.txStatus(txs, window.accountId)
  return result;
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

export async function getState(txHash, accountId) {
  const result = await provider.txStatus(txHash, accountId);
  console.log("Result: ", result);
}

export function flip(args, ammoutNEAR) {
  let yoctoNEAR=  utils.format.parseNearAmount((ammoutNEAR*fees).toString());

  let contractID = process.env.CONTRACT_NAME || 'dev-1645468760160-26705510783939';
  const result = window.walletConnection.account().functionCall({
    contractId:contractID.toString(), methodName:'coin_flip', args:{option:args}, gas: "300000000000000",attachedDeposit:yoctoNEAR})
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