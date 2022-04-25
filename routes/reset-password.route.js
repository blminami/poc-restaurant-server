var express = require('express');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
let models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var router = express.Router();

var email = process.env.MAILER_EMAIL_ID || 'mail@gmai.com',
  pass = process.env.MAILER_PASSWORD || 'password';

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  secure: true,
  port: 465,
  auth: {
    user: email,
    pass: pass
  }
});

router.post('/', function (req, res, next) {
  models.user
    .findOne({
      where: {
        resetPasswordToken: req.body.token,
        resetPasswordExpires: {
          [Op.gt]: Date.now()
        }
      }
    })
    .then((user) => {
      if (user) {
        if (req.body.password === req.body.confirmPassword) {
          user.hash = bcrypt.hashSync(req.body.password, 10);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          models.user
            .findOne({ where: { username: user.username } })
            .then((user) => {
              user
                .update({
                  hash: user.hash,
                  resetPasswordToken: user.resetPasswordToken,
                  resetPasswordExpires: user.resetPasswordExpires
                })
                .then((user) => {
                  var htmlBody =
                    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Confirmation mail</title>
    
    
  </head>
  <body style="-webkit-text-size-adjust: none; box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; height: 100%; line-height: 1.4; margin: 0; width: 100% !important;" bgcolor="#F2F4F6"><style type="text/css">
body {
width: 100% !important; height: 100%; margin: 0; line-height: 1.4; background-color: #F2F4F6; color: #74787E; -webkit-text-size-adjust: none;
}
@media only screen and (max-width: 600px) {
  .email-body_inner {
    width: 100% !important;
  }
  .email-footer {
    width: 100% !important;
  }
}
@media only screen and (max-width: 500px) {
  .button {
    width: 100% !important;
  }
}
</style>
    <span class="preheader" style="box-sizing: border-box; display: none !important; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; mso-hide: all; opacity: 0; overflow: hidden; visibility: hidden;"></span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding: 0; width: 100%;" bgcolor="#F2F4F6">
      <tr>
        <td align="center" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding: 0; width: 100%;">
            <tr>
              <td class="email-masthead" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; padding: 25px 0; word-break: break-word;" align="center">
                APP </td>
            </tr>
            
            <tr>
              <td class="email-body" width="100%" cellpadding="0" cellspacing="0" style="-premailer-cellpadding: 0; -premailer-cellspacing: 0; border-bottom-color: #EDEFF2; border-bottom-style: solid; border-bottom-width: 1px; border-top-color: #EDEFF2; border-top-style: solid; border-top-width: 1px; box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0; padding: 0; width: 100%; word-break: break-word;" bgcolor="#FFFFFF">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0 auto; padding: 0; width: 570px;" bgcolor="#FFFFFF">
                  
                  <tr>
                    <td class="content-cell" style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; padding: 35px; word-break: break-word;">
                      <h1 style="box-sizing: border-box; color: #2F3133; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 19px; font-weight: bold; margin-top: 0;" align="left">Hi ` +
                    user.firstName +
                    ' ' +
                    user.lastName +
                    `,</h1>
                      <p style="box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 1.5em; margin-top: 0;" align="left">This email is to confirm that you recently changed your password for your ` +
                    user.username +
                    ` account.
                      <p style="box-sizing: border-box; color: #74787E; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; line-height: 1.5em; margin-top: 0;" align="left">Thanks,
                        <br />The xxxxxxx Team</p>
                    </td>
                  </tr>

                  
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
                  var data = {
                    to: user.email,
                    from: email,
                    subject: 'Password changed',
                    html: htmlBody
                  };
                  smtpTransport.sendMail(data, function (err) {
                    if (!err) {
                      return res.json({ message: 'Password reset' });
                    } else {
                      return console.log(err);
                    }
                  });
                });
            })
            .catch((err) => next(err));
        } else {
          return res.status(422).send({
            message: 'Passwords do not match'
          });
        }
      } else {
        return res.status(400).send({
          message: 'Password reset token is invalid or has expired.'
        });
      }
    })
    .catch((err) => next(err));

  //router.post
});

module.exports = router;
