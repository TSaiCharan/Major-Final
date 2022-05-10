var express = require('express');
const app = express.Router();
const Contestapi = require("./contest");
const Userapi = require("./user");
const Participantapi= require("./participant");


app.use("/user",Userapi);
app.use("/contest",Contestapi);
app.use("/participant",Participantapi);


module.exports=app;