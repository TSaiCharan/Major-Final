var express = require('express');
const app = express();
var path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(path.join(__dirname+'/../../frontend')));


app.get("/", (req,res)=>
{   var p=path.join(__dirname+'/../../frontend/html/index.html')
    res.sendFile(p);})

app.get("/index", (req,res)=>
    {   var p=path.join(__dirname+'/../../frontend/html/index.html')
        res.sendFile(p);})

app.get("/accessStudent", (req,res)=>
{   var p=path.join(__dirname+'/../../frontend/html/accessStudent.html')
    res.sendFile(p);})

app.get("/accessFaculty", (req,res)=>
    {   var p=path.join(__dirname+'/../../frontend/html/accessFaculty.html')
        res.sendFile(p);})

app.get("/dashboardStudent", (req,res)=>
    {   var p=path.join(__dirname+'/../../frontend/html/dashboardStudent.html')
        res.sendFile(p);})
app.get("/dashboardFaculty", (req,res)=>
        {   var p=path.join(__dirname+'/../../frontend/html/dashboardFaculty.html')
            res.sendFile(p);})
app.get("/contest/:contestid", (req,res)=>
    {   var p=path.join(__dirname+'/../../frontend/html/contest.html')
        res.sendFile(p);})
  
app.get("/Quiz/:contestid", (req,res)=>
    {   var p=path.join(__dirname+'/../../frontend/html/dyn_quiz.html')
        res.sendFile(p);})
// app.get("/testingq/:contestid",(req,res)=>{
//     var p = path.join(__dirname+'/../../frontend/html/dyn_quiz.html')
//     res.sendFile(p);
// })
 app.get("/verify", (req,res)=>
{   var p=path.join(__dirname+'/../../frontend/html/verify.html')
    res.sendFile(p);})

    app.get("/frgtpswrd", (req,res)=>
{   var p=path.join(__dirname+'/../../frontend/html/frgtpswrd.html')
    res.sendFile(p);})

    app.get("/example", (req,res)=>
{   var p=path.join(__dirname+'/../../frontend/html/example.html')
    res.sendFile(p);})


// app.get("/:contestid/:participantid", (req,res)=>
// {   var p=path.join(__dirname+'/../../frontend/html/certificate.html')
//     res.sendFile(p);})

app.get("/results/:contestid", (req,res)=>
    {   var p=path.join(__dirname+'/../../frontend/html/results.html')
        res.sendFile(p);})

app.get("/getScores/:contestid", (req,res)=>
{   var p=path.join(__dirname+'/../../frontend/html/Studentresults.html')
    res.sendFile(p);})
    
    
// app.get("/:contestid/:participantid",(req,res)=>{
//     res.render('certificate.ejs')
// })


module.exports=app;