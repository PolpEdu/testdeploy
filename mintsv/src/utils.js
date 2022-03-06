import { connect, Contract, keyStores, WalletConnection, utils, providers } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: [''],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['nft_mint'],
  })
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


export function mintmeup() {
  let yoctoNEAR = utils.format.parseNearAmount("1");
  let contractID = process.env.CONTRACT_MINT || 'dev-1646526212589-74798020278785';
  const result = window.walletConnection.account().functionCall({
    contractId: contractID.toString(), methodName: 'nft_mint', gas: "300000000000000", attachedDeposit: yoctoNEAR
  })

}

export const maintitlesayings = [
  "yay minting site awoo, look at me im such a great minting site",
  "this mint do be looking kinda cool doe",
  "you get a mint, i get a mint, EVERYONE GETS A MINT",
  "i'm a cute minting site, i'm a cute minting site, i'm a cute minting site",
  "amongus Nft when 🥱🥱🥱🥱",
  "this art do be looking kinda fire 🔥🔥🔥 (i need to stop with this meme)",
  "fuck man, I don't have anymore ideias for phrases just refresh the page",
  "its fucking 4 am and I'm writting random ass phrases for this shitty ass minting site",
]