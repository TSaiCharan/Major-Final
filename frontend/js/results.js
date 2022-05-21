$(document).ready(()=>{
    var score = 0;
    console.log(localStorage.userid   )
    $.ajax({
        url: `/api/participant/${localStorage.userid}`,
        type: 'GET',
        success: (data)=>{
            cert_id = ""
            console.log(data.result)
            var detail = {
                passkey: data.result[0].passkey,
                ContestId: data.result[0].ContestId,
                name: data.result[0].name
            }
            localStorage.certifyData = JSON.stringify(detail)
            $.ajax({
                url : `/api/contest/user/`+localStorage.userid,
                type : 'GET',
                success : (data1)=>{
                    console.log("here");
                    data1.result.alloweddata.forEach(element => {
                        if(element.contestId == location.href.split('/').slice(-1)[0]){
                            score = element.score;
                        }
                    })
                    data1.result.cdata.forEach(element=>{
                        // console.log(location.href.split('/').slice(-1)[0]==element._id)
                        if(location.href.split('/').slice(-1)[0]==element._id){
                            cert_id=element.cert_id;
                        }
                    })
                    $.ajax({
                        url: '/api/participant/getCertificate',
                        type: 'GET',
                        success: (result)=>{
                            console.log(result)
                            console.log(result[cert_id])
                            $('#style').html(result[cert_id].style)
                            $('#main').html(result[cert_id].main)
                            $("#org").html(data.result[0].contestName);
                            $("#head").html("Certificate of Appreciation");
                            $("#name").html(data.result[0].name);
                            if(cert_id=="simpleTwo"){
                                $("#remarks").html("And appreciating his/her efforts in the Contest.Having scored "+score+"/10 in the Course");
                            }
                            if(cert_id=="BZ"){
                                $("#remarks1").html("organized by Being Zero Pvt Ltd with "+score+"/10 in the Course");
                            }
                            $("#issuer").html("Get-Certified");
                            $("#host").html(data.result[0].contestName);
                            $("#sponsor").html("CVR");
                            var date = new Date();
                            var issuedOn = date.getUTCDate() +" "+ date.getUTCMonth() +" "+ date.getUTCFullYear();
                            $("#issued").html(issuedOn);
                            console.log(date);
                        }
                    })
                }
            })
            console.log(data.result);
            
        }
    })
    
        

    $("#download-pdf").click(()=>{
        var certifiedData = JSON.parse(localStorage.certifyData)
        console.log(certifiedData)
        $.ajax({
            url: '/api/participant/makecertified',
            data: certifiedData,
            type: 'PATCH',
            success: (result)=>{
                console.log(result)
            }
        })
        $("#download-pdf").hide()
        window.print()
        $("#download-pdf").show()
    })
})