import { connect, Contract, keyStores, WalletConnection, utils } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')
let near;


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
  })
}

export function convertYocto(YOCTO){
  return utils.format.formatNearAmount(YOCTO);
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

/*

 @param receiver who, receives the NEAR
 @param ammount of near to send
*/
export async function transact(receiver, ammout)  {
  console.log('Processing transaction...\nSending ' + ammout + ' NEAR to ' + receiver+ ' from ' + window.accountId);
  //convert ammout to yoctoNear
  const ammoutyoctoNEAR = utils.format.parseNearAmount(ammout);

  try {
    await window.walletConnection.account().sendMoney(
      receiver, // receiver account
      ammoutyoctoNEAR // amount in yoctoNEAR
    );
    console.log('Transaction sent!');
  } catch (e) {
    console.log(e);
    <NotificationError/>
  };
}

export function toggleDarkMode() {
  console.log("boooooo")
}


function NotificationError(sender, publicKey) {
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
