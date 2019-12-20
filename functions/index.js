const functions = require('firebase-functions');
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
})

exports.sendMail = functions.https.onCall((data,context) => {
    let email = {
        from: gmailEmail,
        to:gmailEmail,
        bcc: "kotarosakata2002@gmail.com,kosentaguri1@gmail.com,youakasaka280.gogo@gmail.com,annin401@gmail.com",
        subject:"Lask運営より",
        text: data.naiyou
    }
    mailTransport.sendMail(email, (err, info) => {
        if (err) {
            return console.log(err)
        }
        return console.log(data)
    })
})
