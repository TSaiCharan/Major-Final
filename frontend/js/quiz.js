var contestid = location.href.split('/').slice(-1)[0];
function fillTable(){
     $.ajax({
         url : `/api/contest/getques/`+contestid,
         type : 'GET',
         success : (data)=>{
             //console.log(data)
             data = data.result
            //  data = data.result.cdata;
             var t= ""  ;
             localStorage.num_ques = data.length;
             for(let i=0;i<data.length;i++){
                 t+="<div class=\"row\"><div class=\"col\"><br><br><span>"
                 t+=data[i].question
                 t+="</span> <br><br><div class=\"row pt-1\">"
                 t+="<div class=\"col-md-3\"><div class=\"options\"><label class=\"option\">"+data[i].options[0]
                 t+="<input type=\"radio\" value=\"a\" id=\"que"+i+"\" name=\"que"+i+"\"> <span class=\"checkmark\"></span> </label> </div></div>"
                 t+="<div class=\"col-md-3 mt-md-0 mt-3\"><div class=\"options\"> <label class=\"option\">"+data[i].options[1]
                 t+="<input type=\"radio\" value=\"b\" id=\"que"+i+"\" name=\"que"+i+"\"> <span class=\"checkmark\"></span> </label> </div></div>"
                 t+="<div class=\"col-md-3 mt-md-0 mt-3\"><div class=\"options\"> <label class=\"option\">"+data[i].options[2]
                 t+="<input type=\"radio\" value=\"c\" id=\"que"+i+"\" name=\"que"+i+"\"> <span class=\"checkmark\"></span> </label> </div></div>"
                 t+="<div class=\"col-md-3 mt-md-0 mt-3\"><div class=\"options\"> <label class=\"option\">"+data[i].options[3]
                 t+="<input type=\"radio\" value=\"d\" id=\"que"+i+"\" name=\"que"+i+"\"> <span class=\"checkmark\"></span> </label> </div></div>"
                 t+="</div></div></div><br><br>"
             }
             if(data.length)
                 t+="<div><button class=\"btn btn-success\" id=\"quiz\" onclick=\"submit()\">Submit</button></div>"
                 $("#questions").html(t);
         }
     })

 }
 function submit(){
    answers = {}
        console.log("HAHAAH")
        for(let i=0;i<localStorage.num_ques;i++){
            document.getElementsByName('que'+i).forEach((option)=>{
                console.log(option.checked);
                if(option.checked==true) {
                    console.log(option.value);
                    answers["a"+i]= option.value;
                }
            });
        }
        console.log(answers)
        user = {
                            contestid:localStorage.contestID,
                            userid:localStorage.userid,
                        }
        $.ajax({
            type: "POST",
            url:"/api/contest/verifynew/"+localStorage.contestID,
            data : {"contestData":answers,"num_question":localStorage.num_ques,"User":user},
            success : (result)=>{
                console.log(result);
                // console.log(answers);
            },
            error: (error)=>{
                console.log(error);
                // console.log(answers);
            }
        })  
        window.location.href = `/dashboardStudent`
 }
$(document).ready(()=>{
    fillTable();
})
    // $("#quiz").click(()=>{
    //     answers = {}
    //     console.log("HAHAAH")
    //     for(let i=0;i<localStorage.num_ques;i++){
    //         document.getElementsByName('que'+i).forEach((option)=>{if(option.checked==true) {answers["question"+i]= option.value} else{answers["question"+i] = -1}});
    //     }
    //     user = {
    //                 contestid:localStorage.contestID,
    //                 userid:localStorage.userid,
    //             }
    //             $.ajax({
    //                 type: "POST",
    //                 url:"/api/contest/verify",
                    
    //                 data : {"contestData":answers,"User":user},
    //                 success : (result)=>{
    //                     console.log(result);
    //                     console.log(answers);
    //                 },
    //                 error: (error)=>{
    //                     console.log(error);
    //                     console.log(answers);
    //                 }
    //             })
    // })
    // $("#quiz").click(()=>{
    //     var question1,question2,question3,question4,question5,question6,question7,question8,question9,question10;
    //     document.getElementsByName('que1').forEach((option)=>{if(option.checked==true) {question1= option.value} else{question1 = -1}});
    //     document.getElementsByName('que2').forEach((option)=>{if(option.checked==true) {question2= option.value} else{question2 = -1}});
    //     document.getElementsByName('que3').forEach((option)=>{if(option.checked==true) {question3= option.value} else{question3 = -1}});
    //     document.getElementsByName('que4').forEach((option)=>{if(option.checked==true) {question4= option.value} else{question4 = -1}});
    //     document.getElementsByName('que5').forEach((option)=>{if(option.checked==true) {question5= option.value} else{question5 = -1}});
    //     document.getElementsByName('que6').forEach((option)=>{if(option.checked==true) {question6= option.value} else{question6 = -1}});
    //     document.getElementsByName('que7').forEach((option)=>{if(option.checked==true) {question7= option.value} else{question7 = -1}});
    //     document.getElementsByName('que8').forEach((option)=>{if(option.checked==true) {question8= option.value} else{question8 = -1}});
    //     document.getElementsByName('que9').forEach((option)=>{if(option.checked==true) {question9= option.value} else{question9 = -1}});
    //     document.getElementsByName('que10').forEach((option)=>{if(option.checked==true){question10= option.value}else{question10 = -1}});
    //     var contestData = [
    //          question1,
    //          question2,
    //          question3,
    //          question4,
    //          question5,
    //          question6,
    //          question7,
    //          question8,
    //          question9,
    //          question10,
    //     ]
        
    //     user = {
    //         contestid:localStorage.contestID,
    //         userid:localStorage.userid,
    //     }
    //     $.ajax({
    //         type: "POST",
    //         url:"/api/contest/verify",
            
    //         data : {"contestData":contestData,"User":user},
    //         success : (result)=>{
    //             console.log(result);
    //             console.log(contestData);
    //         },
    //         error: (error)=>{
    //             console.log(error);
    //             console.log(contestData);
    //         }
    //     })

    //     window.location.href = `/dashboardStudent`
    // })
// })