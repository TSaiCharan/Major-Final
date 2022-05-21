function verify()
{
    var email = String(document.getElementsByClassName("email")[0].value);
    var passkey = String(document.getElementsByClassName("passkey")[0].value);
    console.log('here');
    $.ajax({
        type: "PATCH",
        url: "/api/user/verifyEmail",
        data: {
            email: email,
            verificationKey: passkey
        },
        success: function(resultData) {
            console.log(resultData);
            if (resultData.message == "User verified") {
                swal({
                    title: "Hurray!",
                    text: "Your Email is Verified Succesfuly :) ",
                    type: "success",
                    timer: 6000
                    }); 
                    setTimeout(function () {   
                        window.location.href = '/';
                     }, 2000);
              
            }
        }, 
        error: function(error) {
            console.log(error);
                if (error.responseJSON.message == "Pass key expired") {
                   //set toast click on resend
                } else {
                    var x = document.getElementById("alertmsg");
                    x.innerHTML = ` <div class="alert alert-danger alert-dismissible">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Sorry!</strong>You are not registered  ${error.responseJSON.message}
                  </div>`
                    x.className = "show";
                    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
                }
            } //error
    });
}
 
function sendkey()
{
    var emailid = String(document.getElementsByClassName("email")[0].value);
  var c=1;
  if(emailid=="")
  {
    var x = document.getElementById("alertmsg");
    x.innerHTML = ` <div class="alert alert-danger alert-dismissible">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Sorry!</strong>Please Enter Your Email 
  </div>`   
  }
  if(c==1)
  {
    $.ajax({
        type: "POST",
        url: "/api/user/resendVerificationEmail",
        data: {
            email: emailid,

        },
        success: function(resultData) {
            console.log(resultData);
            swal({
                title: "Sent Passkey",
                text: "Please check your mail for passkey",
                type: "success",
                timer: 2000
                });
        }, //sucess
        error: function(error) {
            console.log(error);
                
                    var x = document.getElementById("alertmsg");
                    x.innerHTML = ` <div class="alert alert-danger alert-dismissible">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Sorry!</strong> ${error.responseJSON.message}
                  </div>`
                    x.className = "show";
                    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
            } //error
    });
}
}