
var thead = "<tr><th>Contest Name</th><th>Created On</th><th>Organisation</th><th></th></tr>"


function fillTable(){
   // console.log(localStorage.userid);
    $.ajax({
        url : `api/contest/user/`+localStorage.userid,
        type : 'GET',
        success : (data)=>{
            localStorage.StudentScores = data.result.alloweddata;
            console.log(data.result)
            var data1 = data.result.cdata;
            var t= thead;
            for(let i=0;i<data1.length;i++){
                var date = new Date(data1[i].creationtime);
                date=date.toLocaleDateString();
                t += "<tr id="+data1[i].contestname+"><td>"+data1[i].contestname+"</td><td>"+date+"</td><td>"+data1[i].organisation+"</td>";
                var flag =0;
                data.result.alloweddata.forEach(element => {
                    if(data1[i]._id == element.contestId){
                        flag =1;
                    }
                });
                if(flag ==1){
                    t += "<td><button disabled id="+data1[i]._id+"  class='btn btn-primary '>Participate contest</button></td>";
                }else
                {t += "<td><button id="+data1[i]._id+" class='btn btn-primary'>Participate contest</button></td>";}
                if(flag ==1){
                    t += "<td><button id="+data1[i]._id+" class='btn btn-success'>Get Certificate</button></td></tr>";
                }else{
                    t += "<td><button disabled id="+data1[i]._id+" class='btn btn-success'>Get Certificate</button></td></tr>";
                }
            }

            if(data1.length)
                $("#contestTable").html(t);
        }
    })
}
function update_usercontests(){

}
$(document).ready(()=>{
    $("#userID").html("Welcome "+localStorage.username)
    fillTable();
    $("#addContest").click(()=>{
        $("#myModal").modal("show")    
    })
    $("#formSubmit").click(()=>{
        var contestData = {
            contestname : $("#contestname").val(),
            username : localStorage.username,
            description : $("#descp").val(),
            organisation : $("#organisation").val()
        }        
        console.log(contestData)
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

    })

    $(this).click((e)=>{
        var btn = $(e.target).attr('id')
        var btnClass = $(e.target).attr('class')
        if(btnClass == "btn btn-primary"){
            console.log(btn)
            localStorage.contestID = btn
            window.location.href = `/quiz/${btn}`
            
        }
        if(btnClass == "btn btn-success"){
            console.log(btn)
            var contestName = $(e.target).parent().parent().find('td:first-child').text();
            localStorage.contestname = contestName
            localStorage.contestID = btn
            window.location.href = `/results/${btn}`//**************************change here for adding the contest page**************** */
        }

    })

})