const mailjet = require ('node-mailjet')
.connect('1604ae185a9e56b398a50e5dbfb12649', '89756a3a1dfae46846e7dafb1e4d87e8');


function sendVerification(email, uniqueString) {
  mailjet
  .post("send", {
    'version': 'v3.1'
  })
  .request({
    "Messages": [{
      "From": {
        "Email": "godaaksiap@gmail.com",
        "Name": "briexapi"
      },
      "To": [{
        "Email": email,
        "Name": email.split('@')[0]
      }],
      "Subject": "Account Verification",
      "TextPart": "Please confirm your account",
      "HTMLPart": `<h3>Please verify your account trough this url : <br>
      <a href="http://localhost:5000/verify/${uniqueString}">http://localhost:5000/verify/${uniqueString}</a>`,
      "CustomID": "AppAccountVerification"
    }]
  })
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
}

function sendResetLink(email, uniqueString) {
  mailjet
  .post("send", {
    'version': 'v3.1'
  })
  .request({
    "Messages": [{
      "From": {
        "Email": "godaaksiap@gmail.com",
        "Name": "briexapi"
      },
      "To": [{
        "Email": email,
        "Name": email.split('@')[0]
      }],
      "Subject": "Password Reset",
      "TextPart": "Password Reset Request",
      "HTMLPart": `<h3>You can change your password trough this url : <br>
      <a href="http://localhost:5000/reset-password/${uniqueString}">http://localhost:5000/reset-password/${uniqueString}</a>`,
      "CustomID": "AppPasswordResetRequest"
    }]
  })
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
}

module.exports = {
  sendVerification,
  sendResetLink
};