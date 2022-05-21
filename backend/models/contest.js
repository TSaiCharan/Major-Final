const mongoose = require("mongoose");
const User= require("./user");

const contestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contestname : { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    userName: { type: String, required: true },
    participants:[{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score:{type: Number}
    }],
    num_questions: { type: Number},
    questions:[{question:{type: String},answer:{type:String},options:[]}],
    cert_id: { type: String, required: true },
    creationtime: { type: Number},
    isDeleted: { type: Boolean, default: false },
    organisation: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model("Contest", contestSchema);