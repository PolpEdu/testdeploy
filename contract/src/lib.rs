/*
 * This is an example of a Rust smart contract with two simple, symmetric functions:
 *
 * 1. set_greeting: accepts a greeting, such as "howdy", and records it for the user (account_id)
 *    who sent the request
 * 2. get_greeting: accepts an account_id and returns the greeting saved for it, defaulting to
 *    "Hello"
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://github.com/near/near-sdk-rs
 *
 */

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, setup_alloc};
use near_sdk::collections::LookupMap;

setup_alloc!();

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Welcome {
    game: LookupMap<String, u8>,
    seed: Vec<u8>
}

impl Default for Welcome {
  fn default() -> Self {
    Self {
      game: LookupMap::new(b"a".to_vec()),
      seed: env::random_seed(), //0-255
    }
  }
}

#[near_bindgen]
impl Welcome {

    
    pub fn set_number(&mut self, number: u8) { //mutable (mut) para ser memory safe ao mudar alguma coisa
        let account_id = env::signer_account_id();

        // Use env::log to record logs permanently to the blockchain!
        env::log(format!("Saving number '{}' for account '{}'", number, account_id,).as_bytes());

        self.game.insert(&account_id, &number);
    }

    // `match` is similar to `switch` in other languages; here we use it to default to "Hello" if
    // self.records.get(&account_id) is not yet defined.
    pub fn get_greeting(&self, account_id: String) -> String { //nao é preciso porque "mutable" porque não quero mudar nada.
        match self.game.get(&account_id) { //switch case
            Some(greeting) => format!("{}", greeting),
            None => "Hello".to_string(),
        }
    }



    pub fn coin_flip(&self) -> bool {
        let rng = env::sha256(self.seed.as_slice());

        env::log(format!("Random seed: {:?}", self.seed).as_bytes());
        env::log(format!("{:?}", rng).as_bytes());
            
        return rng.as_slice()[0] % 2 == 0; //returns true 50% of the time otherwise false
    }



    pub fn resultslog(&self, max: u8) -> u8 {
        assert!(max > 0);
        let rng = (env::sha256(self.seed.as_slice())).as_slice()[0]; //0 - 255
        //env::log(format!("Random seed: {:?}", self.seed).as_bytes());

        let result = rng % max;
        env::log(format!("{:?}", result).as_bytes());
        return result+1; // (+1) to give a number between 1 and 256
    }

    /* testing */ 
    pub fn get_seed(&self) -> Vec<u8> {
        return self.seed.clone();
    }

    pub fn gen_game(&self, account_id_p1: String, account_id_p2: String){
        let firstplayerResult = coin_flip();

        //if firstplayerResult { firstplayer=account_id_p1 } else { firstplayer=account_id_p2 };
    }
}
