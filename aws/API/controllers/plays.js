
const mongoose = require("mongoose");
const Play = require('../models/play');
const path = require('path');
const {keyStores ,providers,utils} = require('near-api-js');
let providerurl = "https://archival-rpc."+process.env.netinfo+".near.org";
const provider = new providers.JsonRpcProvider(providerurl);
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
require("dotenv").config();


console.log("NET: " + process.env.netinfo); 


async function gettxsStatus(hash, id)  {
    try {
        //console.log("HASH: " + hash);
        //console.log("ID: " + id);
        hash = hash + ""
        id = id + ""
        if(hash === "" || hash === null || hash === undefined || id === "" || id === null || id === undefined) {
            throw new Error("HASH or ID is empty");
        } 

        const result = await provider.txStatus(hash, id);
        return result;
    } catch (err) {
        console.log("Error getting transaction status!");
        
    }


}

exports.postPlay = (req, res, next) => {
    
    gettxsStatus(req.body.txhash, req.body.accountid)
    .then(result => {
        //console.log(result);

        let contract = result.transaction.receiver_id;
        if(contract !== process.env.CONTRACT_NAME) {
            res.status(500).json({
                error: "Invalid contract! What are you trying to do? :eyes: :eyes:",
                message: "Please, if you find any bugs report them to the NearFlip team!"
            });
        }

        // result.status.SuccessValue convert base64 to ascii
        let asciisucess = Buffer.from(result.status.SuccessValue, 'base64').toString('ascii');

        let asciiammount = utils.format.formatNearAmount(result.transaction.actions[0].FunctionCall.deposit)/1.035;
        
        let optionchoosen = JSON.parse(Buffer.from(result.transaction.actions[0].FunctionCall.args, 'base64').toString('ascii')).option; 
        let asciichoosen = optionchoosen ? "heads" : "tails";

        

        if (asciisucess === 'false' || asciisucess === 'true') {
            /* find a play with this transaction hash */
            Play.findOne({
                tx: req.body.txhash
            }).then(play => {
                if (play) {
                    console.log(play);
                    return res.status(400).json({
                        error: "Play already exists"
                    });
                } else {
                    Play.findOne({
                        accountid: req.body.accountid 
                    }).sort({
                        _id: -1
                    }).then(play => {
                        let currentwinstreak = 0;
                        let streakofplayer = play.streak;
                        if(play) {
                            if (asciisucess === 'true' && streakofplayer >= 0) {
                                currentwinstreak = play.streak + 1;
                            }
                            if(asciisucess === 'false' && streakofplayer <= 0) {
                                currentwinstreak = play.streak - 1;
                            }
                        }
                        const newplay = new Play({
                            _id: new mongoose.Types.ObjectId(),
                            walletaccount: req.body.accountid,
                            tx: req.body.txhash,
                            ammount: asciiammount,
                            streak:currentwinstreak,
                            side: asciichoosen,
                            won:asciisucess
                        });
                        //console.log("New Play created!");
                        newplay.save().then(result => {
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

                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: "Couldn't fetch player's plays"
                        });
                    });
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: "error fetching database"
                });
            });       

    } else {
        console.log("Transaction not valid!");
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

    /* Get the 12 recent plays */
    Play.find().sort({
        _id: -1
    }).limit(12).then(plays => {
        res.status(200).json({
            message: "Fetched plays successfully!",
            plays: plays
        });
    }
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
