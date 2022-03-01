
const mongoose = require("mongoose");
const Play = require('../models/play');
const path = require('path');
const {keyStores ,providers} = require('near-api-js');
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
require("dotenv").config();


console.log("NET: " + process.env.netinfo); 

const url =  "https://archival-rpc."+process.env.netinfo+".near.org";
const config = {
  nodeUrl: url,
  deps: {
    keyStore: new keyStores.UnencryptedFileSystemKeyStore(credentialsPath),
  },
};

//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
  config
);


async function gettxsStatus(hash, id)  {
    try {
        console.log("HASH: " + hash);
        console.log("ID: " + id);
        hash = hash + ""
        id = id + ""
        if(hash === "" || hash === null || hash === undefined || id === "" || id === null || id === undefined) {
            throw new Error("HASH or ID is empty");
        } 

        const result = await provider.txStatus(hash.toString(), id.toString());
        console.log(result);
        return result;
    } catch (err) {
        console.log("Error getting transaction status!");
        console.log(err);
    }


}

exports.postPlay = (req, res, next) => {
    console.log(req.body);
    
    gettxsStatus(req.body.txhash, req.body.accountid)
    .then(result => {
        console.log(result);
        if (result.status === "committed") {
            const play = new Play({
            _id: new mongoose.Types.ObjectId(),
            walletaccount: req.body.accountid,
            txsHashes: req.body.txsHashes,


            ammount: req.body.ammount,
            streak: req.body.streak,
            size: req.body.size,
            won: req.body.won,
        });
        play.save().then(result => {
            res.status(201).json({
                message: "Play created successfully!",
                play: {
                    ...result,
                    id: result._id
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    } else {
        res.status(500).json({
            error: "Transaction not committed yet!"
        });
    }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error getting transaction status!",
            error: err
        });
    });
};

exports.getRecentPlays = (req, res, next) => {

    Play.find({
        walletaccount: id
    }).sort({
        date: -1
    }).limit(10).exec().then(result => {
        res.status(200).json({
            message: "Plays fetched successfully!",
            plays: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
