const mongoose = require("mongoose");
const Contest = require("./contest");
const Participant=require('./participants');
    
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googleId: {type: String},
    name: { type: String },
    userType: { type: String, default: "User" },
    email: {
              type: String,
              lowercase: true,
              match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
           },
    mobileNumber: {
              type: Number,
              match: /^([7-9][0-9]{9})$/g,
            },
    password: { type: String},
    contests: [{
        contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
        score:{ type: Number },
    } ],
    
    token: {
        type: String,
    },
    passResetKey: { type: String },
    passKeyExpires: { type: Number },
    verificationKey: { type: String },
    verificationKeyExpires: { type: Number },
    isEmailVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    creationtime: {type: Number}
});

module.exports = mongoose.model("User", userSchema);