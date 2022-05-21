var thead = "<tr><th>Contest Name</th><th>Created On</th><th>Organisation</th><th></th></tr>"
function addFields(){
    var number = document.getElementById("num_question").value;
    var question_container = document.getElementById("question_container");
    while (question_container.hasChildNodes()) {
        question_container.removeChild(question_container.lastChild);
    }
    localStorage.num_ques = number;
    for (i=0;i<number;i++){
        question_container.appendChild(document.createTextNode("Question " + (i+1)));
        var input = document.createElement("input");
        input.type = "text";
        input.name = "question" + i;
        input.id = "question" + i;
        question_container.appendChild(input);
        
        question_container.appendChild(document.createTextNode("Answer " + (i+1)));
        var select = document.createElement("select");
        select.id = "answer"+i;
        select.required = true;
        question_container.appendChild(select);

        var option = document.createElement("option");
        option.value = "a";
        option.text = "a";
        select.appendChild(option);

        var option = document.createElement("option");
        option.value = "b";
        option.text = "b";
        select.appendChild(option);

        var option = document.createElement("option");
        option.value = "c";
        option.text = "c";
        select.appendChild(option);

        var option = document.createElement("option");
        option.value = "d";
        option.text = "d";
        select.appendChild(option);

        question_container.appendChild(document.createElement("br"));
        question_container.appendChild(document.createElement("br"));

        var option_container = document.createElement("option_container");
        option_container.id = "options" + i;
        for (j=0;j<4;j++){ 
            var input1 = document.createElement("input");
            input1.type = "text";
            input1.className ="col-sm-3";
            input1.name = "option"+j;
            input1.id = "option"+j;
            option_container.appendChild(input1); 
        }
        question_container.appendChild(option_container); 
        question_container.appendChild(document.createElement("br"));
        question_container.appendChild(document.createElement("br"));
        question_container.appendChild(document.createElement("br"));
    }
}

function fillTable(){
   // console.log(localStorage.userid);
    $.ajax({
        url : `api/contest/user/`+localStorage.userid,
        type : 'GET',
        success : (data)=>{
            console.log(data)
            data = data.result.cdata;
            var t= thead;
            for(let i=0;i<data.length;i++){
                var date = new Date(data[i].creationtime);
                date=date.toLocaleDateString();
                t += "<tr id="+data[i].contestname+"><td>"+data[i].contestname+"</td><td>"+date+"</td><td>"+data[i].organisation+"</td><td><button id="+data[i]._id+" class='btn btn-primary'>See Participation</button></td></tr>";
            }
            if(data.length)
                $("#contestTable").html(t);
        }
    })
}

$(document).ready(()=>{
    $("#userID").html("Welcome "+localStorage.username)
    fillTable();
    $("#addContest").click(()=>{
        $("#myModal").modal("show")    
    })
    $(this).click((e)=>{
        var btn = $(e.target).attr('id')
        var btnClass = $(e.target).attr('class')
        //console.log(btn+ "   "+ btnClass.split(" " )[0] )
        if(btnClass.split(" " )[0] == "cert" ){
            localStorage.cert_id = btn;
        }
    })
    $("#formSubmit").click(()=>{
        if(localStorage.cert_id == null){
            toastr.options.closeButton = true;
            toastr.error("Please Choose a template")
        }
        else{
            var contestData = {
                contestname : $("#contestname").val(),
                username : localStorage.username,
                description : $("#descp").val(),
                organisation : $("#organisation").val(),
                cert_id : localStorage.cert_id,
            }
            var question_Arr = []
            for (i=0;i<localStorage.num_ques;i++){
                question = {}
                var que = document.getElementById("question"+i).value;
                var ans = document.getElementById("answer"+i).value;
                var options = []
                for(j=0;j<4;j++){ 
                    var op = document.getElementById("options"+i).children[j].value;
                    // var op = document.getElementById("option_container"+j).value;
                    options.push(op); 
                }
                question["question"] = que;
                question["answer"] = ans;
                question["options"] = options;
                question_Arr.push(question);
            }
            contestData["questions"] = question_Arr;
            contestData["num_questions"] = localStorage.num_ques;
            // console.log(contestData)
            $.ajax({
                url : `/api/contest/add/`+localStorage.userid,
                type : 'POST',
                data : contestData,
                success : (result)=>{
                    console.log(result)
                    fillTable();
                }
            })
            $("#myModal").modal("hide");
        }
    })

    $(this).click((e)=>{
        var btn = $(e.target).attr('id')
        var btnClass = $(e.target).attr('class')
        if(btnClass == "btn btn-primary"){
            console.log(btn)
            var contestName = $(e.target).parent().parent().find('td:first-child').text();
            localStorage.contestname = contestName
            localStorage.contestID = btn
            window.location.href = `/getScores/${btn}`//**************************change here for adding the contest page**************** */
        }
    })
})