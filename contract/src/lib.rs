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
use near_sdk::{json_types::U128, AccountId, Promise};

setup_alloc!();

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Welcome {
    seed: Vec<u8>,
    bet_amount: Vec<u128>,
}

impl Default for Welcome {
  fn default() -> Self {
    Self {
      seed: env::random_seed(), //0-255
      bet_amount: vec![500_000_000_000_000_000_000_000, 1_000_000_000_000_000_000_000_000, 2_500_000_000_000_000_000_000_000, 5_000_000_000_000_000_000_000_000, 7_500_000_000_000_000_000_000_000, 10_000_000_000_000_000_000_000_000],
      // last_block: LookupMap::new(b"a".to_vec()),

    }
  }
}

#[near_bindgen]
impl Welcome {

    //true = heads, false = tails
    #[payable]
    pub fn coin_flip(&mut self, option: bool) -> bool {
        let amount: u128 = (env::attached_deposit()*1000)/1035;

        assert!(self.bet_amount.contains(&amount), "Attached amount not in available array. Attached deposit: {}, Amount calculated: {}", env::attached_deposit(),amount);

        let signer = env::signer_account_id();
        let seed = env::random_seed();
        let rng = env::sha256(seed.as_slice());

        //env::log(format!("{:?}", rng).as_bytes());


        let result = rng.as_slice()[0] % 2 == 0;

        //return result; //returns true 50% of the time otherwise false
        if result == option{
            let to: AccountId = env::signer_account_id(); //env::current_account_id() //"ertemo.testnet".parse().unwrap();
            Promise::new(to).transfer(amount*2);
            env::log(format!("lucky you").as_bytes());
            return true;
        }
        env::log(format!("lmao rugged xddddddd!111!!1").as_bytes());
        return false;
    }
}

#[cfg(test)]
mod tests{

    /* testing */ 
    pub fn get_seed(&self) -> Vec<u8> {
        return self.seed.clone();
    }

}