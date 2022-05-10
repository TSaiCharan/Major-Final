var templates = {
    simple : {
        style : '@page { size: landscape; }\
                #org{ text-align: center;margin-top: 35px;font-family: "Arima Madurai"; }\
                #head{ text-align: center;font-family: "Arvo";margin-top: 10px;font-size: 60px; }\
                #sub-head{ text-align: center;margin-top: 30px;font-family: "Barlow Semi Condensed"; }\
                #name{ text-align: center;margin-top: 20px;font-family: "Bai Jamjuree";text-decoration: underline; }\
                #remarks{ text-align: center;margin-top: 30px;font-family: "Baloo 2"; }\
                #issued{ font-family: "Baloo 2";margin-left: 15px;margin-bottom: 15px; }\
                .credits{ font-family: "Barlow";font-size: 18px;margin-bottom: 50px; }',
        main : '<div class="container" style="border: 13px solid rgb(144, 201, 255);">\
                    <h3 id="org"></h3>\
                    <h1 id="head"></h1>\
                    <h4 id="sub-head">This Certificate is presented to</h4>\
                    <h2 id="name"></h2>\
                    <h4 id="remarks"></h4>\
                    <h6>Issued on : </h6><h6 id="issued"></h6>\
                    <div class="d-flex justify-content-around" style="margin-left: 25px;">\
                        <div>Issued By: <h3 align="center" class="credits" id="issuer"></h3>\
                        </div>\
                        <div>Hosted By: <h3 align="center" class="credits" id="host"></h3>\
                        </div>\
                        <div>Sponsored By: <h3 align="center" class="credits" id="sponsor"></h3>\
                        </div>\
                    </div>\
                </div>'
    },

    simpleTwo : {
        style : '@page { size: landscape; }\
                .tag-center{\
                    height: 50px;\
                    width: 80px;\
                    background-color: #ffd000;\
                    margin-left: 20px;\
                }\
                .tag-left{\
                    width: 0;\
                    height: 0;\
                    border-left: 0px solid transparent;\
                    border-right: 40px solid transparent;\
                    border-top: 50px solid #ffd000;\
                    margin-left: 20px;\
                }\
                .tag-right{\
                    width: 0;\
                    height: 0;\
                    border-left: 40px solid transparent;\
                    border-right: 0px solid transparent;\
                    border-top: 50px solid #ffd000;\
                }\
                #org{ text-align: center;font-family: "Arima Madurai"; }\
                #head{ text-align: center;font-family: "Arvo";margin-top: 10px;font-size: 60px; }\
                #sub-head{ text-align: center;margin-top: 30px;font-family: "Barlow Semi Condensed"; }\
                #name{ text-align: center;margin-top: 20px;font-family: "Bai Jamjuree";text-decoration: underline; }\
                #remarks{ text-align: center;margin-top: 30px;font-family: "Baloo 2"; }\
                #issued{ font-family: "Baloo 2";margin-left: 15px;margin-bottom: 15px; }\
                .credits{ font-family: "Barlow";font-size: 18px;margin-bottom: 50px; }',
        main : '<div class="container" style="border: 15px solid rgb(164, 144, 255);background-color: rgb(252, 253, 255);">\
                    <div class="tag-center"></div>\
                    <div class="d-flex justify-content">\
                        <div class="tag-left"></div>\
                        <div class="tag-right"></div>\
                    </div>\
                    <h3 id="org"></h3>\
                    <h1 id="head"></h1>\
                    <h4 id="sub-head">This Certificate is presented to</h4>\
                    <h2 id="name"></h2>\
                    <h4 id="remarks">\
                        <p> --remarks-- </p>\
                    </h4>\
                    <h6>Issued on : </h6><h6 id="issued"></h6>\
                    <div class="d-flex justify-content-around" style="margin-left: 25px;">\
                        <div>Issued By: <h3 align="center" class="credits" id="issuer"></h3>\
                        </div>\
                        <div>Hosted By: <h3 align="center" class="credits" id="host"></h3>\
                        </div>\
                        <div>Sponsored By: <h3 align="center" class="credits" id="sponsor"></h3>\
                        </div>\
                    </div>\
                </div>'
    }
}

module.exports = templates