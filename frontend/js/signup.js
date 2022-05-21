function signup() {
    //Email verification
    function IsEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) return false;
        else return true;
    }

    //Phone Number verfication
    function IsPhoneno(phoneno) {
        var regex = /^([7-9][0-9]{9})$/g;
        if (!regex.test(phoneno)) return false;
        else return true;
    }
    function Ispassword(password)
    { var paswd =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
      if(password.match(paswd))  return true;
      else return false;
    }
    
    //console.log("Hello");
    var emailid = String(document.getElementsByClassName("emailid")[0].value);
    var phoneno = String(document.getElementsByClassName("phone")[0].value);
    var password = String(document.getElementsByClassName("pswrd")[0].value);
    var conformpassword= String(document.getElementsByClassName("cnfrmpswrd")[0].value);
    var name = String(document.getElementsByClassName("name")[0].value);
    
    //alert(emailid+ " " +phoneno+password+" " +conformpassword+" " +name);
    var c = 6;
    if (name == "") {
        
        document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Sorry!</strong>Please Enter your name 
      </div>`;
        c--;
    } 
    else if (emailid == "") {
        document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Sorry!</strong>Please Enter the Email
      </div>`;
        c--;
    } 
    else if(password!=conformpassword)
    {
        document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Sorry!</strong>Passwords doesnot match
      </div>`;
      c--;
    }
    else if (password == "") {
        document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Sorry!</strong>Please Enter the password
      </div>`;
        c--;
    }
    else if(password.length<8)
    {
        document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Sorry!</strong>Password should contain atleast 8 charectes
      </div>`;
      c--;   
    }

    if (c == 6) {

       // alert("Hello");
        if (!IsEmail(emailid)) {
            document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Sorry!</strong>Invalid Email
          </div>`;
            c--;
        } 
        else if (!IsPhoneno(phoneno) && phoneno != "") {
            document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Sorry!</strong>Invalid phone No
          </div>`;
            c--;
        } 
        else if (!Ispassword(password)) {
            //alert("Hello");
            swal({
                title: "Sorry!",
                text: "password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                type: "warning",
                timer: 6000
                });
            c--;
        } 
    }

    //ajax call to create an instance to the user in database
    if (c == 6) {

        $.ajax({
            type: "POST",
            url: "/api/user/signup",
            async: false,
            data: {
                email: emailid,
                name: name,
                mobileNumber: phoneno,
                password: password
            },
            success: function(resultData) {
                if (resultData.message == "Email already exists")
                    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Sorry!</strong>Enter the Email
                  </div>`;
                if (resultData.message == "user created") {
                    window.location.href = '/verify';
                }
            }, //sucess
            error: function(resultData) {
                    if (resultData.responseJSON.message == "Unauthorized access") {
                        location.href = "/"
                    } else {
                        var x = document.getElementById("alert");

                        x.innerHTML = `<div class="alert alert-danger alert-dismissible">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        <strong>Sorry!</strong>Enter the Email
                       ${resultData.responseJSON.message}</div>`
                        x.className = "show";
                        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
                    }
                } //error
        });
    }
} //End of signup function