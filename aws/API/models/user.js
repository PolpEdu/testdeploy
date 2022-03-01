const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    walletaccount: {
        type: String,
        required: true,
    },
    imgurUrl:{
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('User', userschema);