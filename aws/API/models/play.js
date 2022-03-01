const mongoose = require("mongoose");

const playschema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    walletaccount: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    ammount: {
        type: Number,
        required: true,
    },
    tx: {
        type: String,
        required: true,
    },
    streak: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    won: {
        type: Boolean,
        required: true,
    }

});

module.exports = new mongoose.model('Play', playschema);