import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
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
    viewMethods: ['random'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['set_greeting'],
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






export function rngTest() {
  console.log("Starting!")
  var i = 0;
  var dict = {};
  var probability5050odd = {};
  var headsortails = {"Heads": 0, "Tails": 0};
  var min = 100;
  var max = 100;


  if (window.walletConnection.isSignedIn()) {
    setTimeout(function next() {


      window.contract.random() //using the contract to get the greeting
        .then(result => {

          let ft = result;
          console.log("it." + i + " Result: " + ft);

          if(ft % 2 == 0){
            headsortails["Heads"] = headsortails["Heads"] + 1;
          }
          else{
            headsortails["Tails"] = headsortails["Tails"] + 1;
          }


          if (dict[ft] === undefined) {
            dict[ft] = 1;
          } else {
            dict[ft] = dict[ft] + 1;
          }

          if (ft > max) {
            max = ft;
          }
          else if (ft < min) {
            min = ft;
          }



          if (i % 5 === 0) {
            console.log("max: " + max);
            console.log("min: " + min);

            console.log("Contagem: ");
            console.log(dict);

            // sum all the dictonary keys
            let sum = 0;
            for (var key in dict) {
              sum += dict[key];
            }

            // get the probability of each key
            for (var key in dict) {
              probability5050odd[key] = dict[key] / sum;
            }

            console.log("Probabilities: ");
            console.log(probability5050odd);

            console.log("Heads: " + headsortails["Heads"]/sum + " Probability:"+ (headsortails["Heads"]/sum)*100 + "%");
            console.log("Tails: " + headsortails["Tails"]/sum + " Probability:"+ (headsortails["Tails"]/sum)*100 + "%");


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

