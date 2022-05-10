
var thead = "<tr><th>Student Name</th><th>Score</th></tr>"

function fillTable(){
    // console.log(localStorage.userid);
     $.ajax({
         url : `/api/contest/getscores/`+location.href.split('/').slice(-1)[0],
         type : 'GET',
         success : (data)=>{
             console.log(data)
             data = data.result;
             var t= thead;
             for(let i=0;i<data.length;i++){
                 t += "<tr id="+data[i].studentname+"><td>"+data[i].studentname+"</td><td>"+data[i].score+"</td></tr>";
             }
             if(data.length)
                 $("#contestTable").html(t);
         },
         error : (err)=>{
            console.log(err)
         }
     })
 }
 $(document).ready(()=>{
    $("#userID").html("Welcome "+localStorage.username)
    fillTable();
 })