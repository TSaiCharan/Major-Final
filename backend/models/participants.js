const mongoose = require("mongoose");
const User= require("./user");
const Contest= require("./contest");

const participantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contestName : { type: String, required: true },
    ContestId: { type: mongoose.Schema.Types.ObjectID, ref: "Contest" },
    name: { type: String},
    email: {type: String,
            lowercase: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
           },
    rank: { type: Number },
    certified: { type: Boolean, default: false },
    emailsent: { type: Boolean, default: false },
    passkey: {type:String,required: true },
    isDeleted: {type:String, default: false }
});

module.exports = mongoose.model("Participant", participantSchema);