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
        bcc: data.sousinsaki,
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
