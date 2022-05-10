var express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");


var item= require('../itemlib');
var User_M= require('../models/user');
var Contest= require('../models/contest');
var Participants= require('../models/participants');
router.post("/verifynew/:contestid",(req,res)=>{
    var new_sol;
    que_data = {}
    var count =0;
    console.log("hit")
    item.getItemById(req.params.contestid,Contest,async(err,data)=>{
        if (err) {
            res.status(400).json({error: err,});
        } else {
            console.log(data.questions);
            var i=0;
            data.questions.forEach((question)=>{
                que_data["a"+i] = question.answer
                i++
            })
        }
        for (const [key, value] of Object.entries(req.body.contestData)) {
            console.log(key, value);
            if(value==que_data[key]){
                count++
            }
        }
        console.log(count)
        flag = 1
    await item.getItemById(req.body.User.userid,User_M, (err, data)=>
        {if (err) { res.status(400).json({ error: err,});
        } else {
            data.contests.forEach(element => {
                console.log(element.score)
                if(element.contestId==req.body.User.contestid){
                    flag =0;
                    console.log("element already present")
                }
            });
        }
    })
    if(flag==1){
        await User_M.updateOne(
            {_id:req.body.User.userid},
            {$push:{contests:{"contestId":req.body.User.contestid,"score":count}},
            Function (err, data){
                if (err) { 
                    res.status(400).json({ error: err,});
                    console.log(err)
                } else { 
                    res.status(200).json({ message: "created" }) 
                    console.log("pushed")
                }
            }
        })
        await Contest.updateOne(
            {_id:req.body.User.contestid},
            {$push:{participants:{"userId":req.body.User.userid,"score":count}},
            Function (err, data){
                if (err) { 
                    res.status(400).json({ error: err,});
                    console.log(err)
                } else { 
                    res.status(200).json({ message: "created" }) 
                    console.log("pushed")
                }
            }
        })
    }
    })
})
router.post("/verify",async(req,res)=>{
    var solutions = ["c","a","b","b","a","b","b","c","a","d"]
      
    var count =0;
    for(let i=0;i<10;i++){
        if(req.body.contestData[i]==solutions[i]){
            count++;
        }
    }
    flag = 1
    await item.getItemById(req.body.User.userid,User_M, (err, data)=>
        {if (err) { res.status(400).json({ error: err,});
        } else {
            data.contests.forEach(element => {
                console.log(element.score)
                if(element.contestId==req.body.User.contestid){
                    flag =0;
                    console.log("element already present")
                }
            });
        }
    })
    if(flag==1){
        await User_M.updateOne(
            {_id:req.body.User.userid},
            {$push:{contests:{"contestId":req.body.User.contestid,"score":count}},
            Function (err, data){
                if (err) { 
                    res.status(400).json({ error: err,});
                    console.log(err)
                } else { 
                    res.status(200).json({ message: "created" }) 
                    console.log("pushed")
                }
            }
        })
        await Contest.updateOne(
            {_id:req.body.User.contestid},
            {$push:{participants:{"userId":req.body.User.userid,"score":count}},
            Function (err, data){
                if (err) { 
                    res.status(400).json({ error: err,});
                    console.log(err)
                } else { 
                    res.status(200).json({ message: "created" }) 
                    console.log("pushed")
                }
            }
        })
    }
})
router.get('/getscores/:contestid',(req,res)=>{
    item.getItemById(req.params.contestid,Contest, (err,data)=>{
        var outdata = []
        if (err) { 
            res.status(400).json({ error: err,});
        } else { 
            outdata["cert_id"] = data.cert_id;
            for(let i=0;i<data.participants.length;i++){
                item.getItemById(data.participants[i].userId,User_M,(err,dataa)=>
                {
                    if (err) { 
                        res.status(400).json({ error: err,});
                        console.log(err)
                    } else { 
                        var temp = {}
                        temp["studentname"]=dataa.name;
                        temp["score"]= data.participants[i].score;
                        outdata.push(temp);
                        console.log(outdata)
                    }
                    if(i==data.participants.length-1){
                        console.log(outdata)
                        res.status(200).json({result:outdata });
                    }
                })
            }
        }
        
       
    })
})

router.post("/add/:userid", async (req,res)=>
{
    console.log(req.params.userid);
    var data= {
        _id: new mongoose.Types.ObjectId(),
        contestname : req.body.contestname,
        userId: req.params.userid ,
        userName: req.body.username,
        creationtime:  new Date().getTime(),
        isDeleted: false,
        organisation: req.body.organisation,
        description: req.body.description,
        cert_id : req.body.cert_id,
        num_questions:req.body.num_questions,
        questions:req.body.questions
    }
    item.createitem(data,Contest, (err, data)=>
    {if (err) { res.status(400).json({ error: err,});
    } else { res.status(200).json({ message: "created" }) }
   })
})
router.get('/getques/:contestid',async(req,res)=>{
    questions = []
    item.getItemById(req.params.contestid,Contest,(err,data)=>{
        if (err) {
            res.status(400).json({error: err,});
        } else {
            console.log(data.questions);
            data.questions.forEach((question)=>{
                que_data = {}
                que_data["question"] = question.question
                que_data["options"] = question.options
                
                
                questions.push(que_data)
            })
        }
        res.status(200).json({ result: questions })
    })

})
router.get('/user/:userid', async(req, res) => {
    outdata ={}
    outdata["userid"]=req.params.userid
    // console.log(req.params.userid);
    item.getAllItems( Contest, (err, data) => {
        if (err) {
            res.status(400).json({error: err,});
        } else {
            outdata["cdata"]=data
            item.getItemById(req.params.userid ,User_M,(err,udata)=>{
                if (err) {
                    res.status(400).json({error: err,});
                } else {
                    outdata["alloweddata"]=udata.contests
                    res.status(200).json({ result: outdata })
                }
            })
        }
    })
    
    
})

router.get('/details/:id', async(req, res) => {
    console.log(req.params.id);
    item.getItemByQuery({ _id: req.params.id }, Contest, (err, data) => {
        if (err) {
            res.status(400).json({
                error: err,
            });
        } else {
            res.status(200).json({ result: data })
        }
    })
})


// router.get('/addmembers/:contestid', async(req, res) => {
//     console.log((req.body.participants).length);

//     var query={ _id: req.params.contestid };
//     item.getItemByQuery(query, Contest, (err, data) => {
//         if (err) {
//             res.status(400).json({
//                 error: err,
//             });
//         } else {  if(data.length==0) res.status(400).json( {error: "Contest Doesnot Exist"} );
//                   var update= {participants:req.body.participants};
//                   item.updateItem(update,Contest,(err, result)=>
//                   {
//                       if(err)  res.status(400).json({
//                                       error: err,
//                                    });
//                       else  res.status(200).json({ message : result});
//                   })
                  
//                }
//     })
// })

module.exports=router;