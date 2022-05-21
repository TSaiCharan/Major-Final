var express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const emailTemplates = require("../email");
const config=require("../config");

const nodemailer = require('nodemailer');



var item= require('../itemlib');
var User= require('../models/user');
var Contest= require('../models/contest');
const { request } = require('express');

const router = express.Router();

router.get("/:userid", (req, res) => {
    query={_id:req.params.userid};
    populateJson = {
        path: "contests",
        populate: { path: "contestId"}
    }
    // item.getItemById(req.params.userid, User, (err, result) => {
    //     if (err)
    //         console.log("error", e);
    //     else {
    //         console.log(result);
    //         res.send(result);
    //     }
    // })
    item.getItemByIdWithPopulate(req.params.userid,User,populateJson, (err,data)=>
    { res.status(201).json({result:data});})
   
})
router.post("/resendVerificationEmail", async(req, res, next) => {
    const { email } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
         console.log(user);
        if (user.verificationKey == null) {
            return res.status(200).json({ message: "already verified" })
        }
        user.verificationKey = shortid.generate();
        user.verificationKeyExpires = new Date().getTime() + 20 * 60 * 1000;
        await user
            .save()
            .then((result) => {
                const msg = {
                    to: email,
                    from: config.sendgridEmail,
                    subject: "Get Certified: Email Verification",
                    text: " ",
                    html: emailTemplates.VERIFY_EMAIL(result),
                };

                sgMail
                    .send(msg)
                    .then((result) => {
                        res.status(200).json({
                            message: "Password reset key sent to email",
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            // message: "something went wrong1",
                            error: err.toString(),
                        });
                    });
            })
            .catch((err) => {
                res.status(400).json({
                    message: "Some error occurred",
                    error: err.toString(),
                });
            });
    } else {
        return res.status(400).json({
            message: "email not found",

        })
    }
});


router.post("/signup", async(req, res, next) => {
    console.log(req.body)
    item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
        if (err) {
            console.log("err");
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length >= 1) {
                res.status(409).json({
                    message: "Email already exists",
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            mobileNumber: req.body.mobileNumber,
                            isEmailVerified: false,
                            creationtime: new Date().getTime()
                        };
                        item.createitem(user, User, async(err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {

                                let transporter = nodemailer.createTransport({
                                    host: "localhost",
                                    service:'gmail',
                                    port: 587,
                                    secure: false,
                                    secureConnection: false,
                                    auth: {
                                      user: config.user,
                                      pass: config.password, 
                                    },
                                    tls:{
                                        rejectUnauthorized: false
                                    }
                                  });
                                

                                result.verificationKey = shortid.generate();
                                result.verificationKeyExpires =
                                    new Date().getTime() + 20 * 60 * 1000;
                                await result
                                    .save()
                                    .then((result1) => {
                                        const mailOptions = {
                                            from: '"G.Certify Testing" <kaushikveligatla@gmail.com>', 
                                            to: user.email, 
                                            subject: "Testing mail", 
                                            text: "",
                                            html: emailTemplates.VERIFY_EMAIL(result1), 
                                          }

                                        transporter.sendMail(mailOptions, (err,info)=>{
                                            if(err){
                                                return console.log(err)
                                            }
                                            console.log('Message sent : %s', info.messageId);
                                            console.log('Preview URL : %s',nodemailer.getTestMessageUrl(info));
                                        })

                                        // sgMail
                                        //     .send(msg)
                                        //     .then((result) => {
                                        //         console.log("Email sent");
                                        //     })
                                        //     .catch((err) => {
                                        //         console.log(err.toString());
                                        //         res.status(500).json({
                                        //             // message: "something went wrong1",
                                        //             error: err,
                                        //         });
                                        //     });

                                        res.status(201).json({
                                            message: "user created",
                                            userDetails: {
                                                userId: result._id,
                                                email: result.email,
                                                name: result.name,
                                                mobileNumber: result.mobileNumber,
                                            },
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(400).json({
                                            message: "Error",
                                            error: err.toString(),
                                        });
                                    });
                            }
                        })
                    }

                })
            }
        }
    })

});

router.patch("/verifyEmail",async(req, res, next) => {
    //console.log(req.body.key)
    const query=req.body;
    console.log(req.body);
    await User.findOne(query)
        .then(async(user) => {
            if (Date.now() > user.verificationKeyExpires) {
                res.status(401).json({
                    message: "Pass key expired",
                });
            }
            user.verificationKeyExpires = null;
            user.verificationKey = null;
            user.isEmailVerified = true;
            await user
                .save()
                .then((result1) => {
                    res.status(200).json({
                        message: "User verified",
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Some error",
                        error: err.toString(),
                    });
                });
        })
        .catch((err) => {
            res.status(409).json({
                message: "Invalid verification key",
                error:" err.toString()",
            });
        });
});
router.post("/loginFaculty", async(req, res, next) => {
    //console.log(req.body);
    item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed: Email not found probably",
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
                if(user[0].isEmailVerified)
                {if (result) {
                    console.log(result)
                    const token = jwt.sign({
                            userType: user[0].userType,
                            userId: user[0]._id,
                            email: user[0].email,
                            name: user[0].name,
                            mobileNumber: user[0].mobileNumber,
                        },
                        config.jwtSecret, {
                            expiresIn: "1d",
                        }
                    );
                    // req.header['auth-token'] = token;
                    return res.status(200).json({
                       
                        message: "Auth successful",
                        userDetails: {
                            userType: user[0].userType,
                            userId: user[0]._id,
                            name: user[0].name,
                            email: user[0].email,
                            mobileNumber: user[0].mobileNumber,
                            isEmailVerified: user[0].isEmailVerified,
                        },
                        token: token,
                    });
                }

                res.status(401).json({
                    message: "Auth failed1",
                });
            }
            console.log("Not Verified")
            res.status(401).json({
                message: "Your Email Is Not Verified",
            });
            });
        }
    });
});
router.post("/loginStudent", async(req, res, next) => {
    //console.log(req.body);
    item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed: Email not found probably",
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
                if(user[0].isEmailVerified)
                {if (result) {
                    console.log(result)
                    const token = jwt.sign({
                            userType: user[0].userType,
                            userId: user[0]._id,
                            email: user[0].email,
                            name: user[0].name,
                            mobileNumber: user[0].mobileNumber,
                        },
                        config.jwtSecret, {
                            expiresIn: "1d",
                        }
                    );
                    // req.header['auth-token'] = token;
                    return res.status(200).json({
                       
                        message: "Auth successful",
                        userDetails: {
                            userType: user[0].userType,
                            userId: user[0]._id,
                            name: user[0].name,
                            email: user[0].email,
                            mobileNumber: user[0].mobileNumber,
                            isEmailVerified: user[0].isEmailVerified,
                        },
                        token: token,
                    });
                }

                res.status(401).json({
                    message: "Auth failed1",
                });
            }
            console.log("Not Verified")
            res.status(401).json({
                message: "Your Email Is Not Verified",
            });
            });
        }
    });
});

router.post("/forgot", (req, res) => {
    
    var email = req.body.email;
    User.findOne({ email: email }, (err, userData) => {
        if (!err && userData != null) {
            userData.passResetKey = shortid.generate();
            userData.passKeyExpires = new Date().getTime() + 20 * 60 * 1000; // pass reset key only valid for 20 minutes
            userData.save().then((result) => {
                if (!err) {
                    const msg = {
                        to: email,
                        from: config.sendgridEmail,
                        subject: "Get Certified: Password Reset Request",
                        text: " ",
                        html: emailTemplates.FORGOT_PASSWORD(result),
                    };
                    sgMail
                        .send(msg)
                        .then((result) => {
                            res.status(200).json({
                                message: "Password reset key sent to email",
                            });
                        })
                        .catch((err) => {
                            console.log(err.toString());
                            res.status(500).json({
                                // message: "something went wrong1",
                                error: err,
                            });
                        });
                }
            });
        } else {
            res.status(401).json({
                message: "Your Email Is Incorrect",
            });
        }
    });
});

router.post("/resetpass", async(req, res) => {
    /*if (!req.body.captcha) {
        return res.status(400).json({
            message: "No recaptcha token",
        });
    }
    var flag = 0; 
    request(req.verifyURL, (err, response, body) => {
        body = JSON.parse(body);
        console.log(err)
        console.log(body)
        try {
            if (!body.success || body.score < 0.4) {
                flag = 1
                return res.status(401).json({
                    message: "Something went wrong",
                });
            }
            if (err) {
                return res.status(401).json({
                    message: err.toString(),
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: err
            })
        }
    });
    console.log(flag) */
    let resetKey = req.body.resetKey;
    let newPassword = req.body.newPassword;

    await User.findOne({ passResetKey: resetKey })
        .then(async(result) => {
            if (Date.now() > result.passKeyExpires) {
                res.status(401).json({
                    message: "Pass key expired",
                });
            }
            result.password = bcrypt.hashSync(newPassword, 10);
            result.passResetKey = null;
            result.passKeyExpires = null;
            await result
                .save()
                .then((result1) => {
                    res.status(200).json({
                        message: "Password updated",
                    });
                })
                .catch((err) => {
                    res.status(403).json({
                        message: "Unusual error",
                        err: err.toString(),
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Invalid pass key",
            });
        });
});

module.exports=router;