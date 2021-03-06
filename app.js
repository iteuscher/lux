var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nodeMailer = require('nodemailer')
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var luxes = require('./routes/luxes');
var about = require('./routes/about');
var store = require('./store');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true })); //true or false??
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/users', users);

app.use('/about', about);

app.use('/admin', admin);

app.use('/luxes', luxes);

app.post('/createUser', (req, res) => {
  store
    .createUser({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    })
    .then(() => res.sendStatus(200));

    //send new user welcome to lux email
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lux.email.system@gmail.com',
            pass: 'stevegregg'
        }
    });
    let mailOptions = {
        from: '"Lux Email System" <lux.email.system@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Welcome to Lux, ' + req.body.firstname + '!',      // subject: req.body.subject, // Subject line
        text: "It's great to have you " + req.body.firstname + req.body.lastname, // plain text body
        //html: "Hello " + req.body.firstname + req.body.lastname " </br> Welcome to Lux! </br> Thanks for joining Lux. Lux is a web-based activity to help a community become more aware of its silent identites. If you need help feel free to respnod to this email or send a new email to: lux.email.system@gmail.com",
        html: '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <meta charset="utf-8"> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldnt be necessary --> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title> Welcome to Lux </title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset : BEGIN --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin: 0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode: bicubic; } /* What it does: A work-around for email clients meddling in triggered links. */ *[x-apple-data-detectors], /* iOS */ .x-gmail-data-detectors, /* Gmail */ .x-gmail-data-detectors *, .aBn { border-bottom: 0 !important; cursor: default !important; color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */ .a6S { display: none !important; opacity: 0.01 !important; } /* If the above doesn"t work, add a .g-img class to any image in question. */ img.g-img + div { display: none !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89 */ /* Create one of these media queries for each additional viewport size you"d like to fix */ /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */ @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */ .email-container { min-width: 375px !important; } } @media screen and (max-width: 480px) { /* What it does: Forces Gmail app to display email full width */ div > u ~ div .gmail { min-width: 100vw; } } </style> <!-- CSS Reset : END --> <!-- Progressive Enhancements : BEGIN --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 600px) { /* What it does: Adjust typography on small screens to improve readability */ .email-container p { font-size: 17px !important; } } </style> <!-- Progressive Enhancements : END --> <!-- What it does: Makes background images in 72ppi Outlook render at correct size. --> <!--[if gte mso 9]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--></head><body width="100%" bgcolor="#222222" style="margin: 0; mso-line-height-rule: exactly;"> <center style="width: 100%; background: #222222; text-align: left;"> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> Thank you for joining Lux! You can now sign in to your account. </div> <!-- Visually Hidden Preheader Text : END --> <!-- Set the email width. Defined in two places: 1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px. 2. MSO tags for Desktop Windows Outlook enforce a 600px width. --> <div style="max-width: 600px; margin: auto;" class="email-container"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;"> <tr> <td style="padding: 20px 0; text-align: center"> <!-- <img src="http://placehold.it/200x50" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> --></td> </tr> </table> <!-- Email Header : END --> <!-- Email Body : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;"> <!-- Hero Image, Flush : BEGIN --> <tr> <td bgcolor="#ffffff" align="center"> <br> <br> <img src="https://i.imgur.com/tiPG1bm.png" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; margin: auto;" class="g-img"> </td> </tr> <!-- Hero Image, Flush : END --> <!-- 1 Column Text + Button : BEGIN --> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding: 30px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> <h2 style="margin: 0 0 10px 0; text-align: center; font-family: sans-serif; font-size: 22px; line-height: 130%; color: #333333; font-weight: bold;">Thank you for joining Lux, ' + req.body.firstname + ' ' + req.body.lastname + '!</h2> <br> <p style="margin: 0; text-align: center; ">We&apos;re glad to have you as part of our community. In case you have any questions, feel free to reach out to us by responding to this email or by sending a note to lux.emailer.system@gmail.com.</p> </td> </tr> <tr> <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 125%; color: #333333; text-align: center;">You can now sign in to your Lux account by entering ' + req.body.email + ' and your password.</h2> <br> <!-- Button : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;"> <tr> <td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td"> <a href="localhost:3000/#signin" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 110%; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a"> <span style="color:#ffffff;" class="button-link">&nbsp;&nbsp;&nbsp;&nbsp;Sign In&nbsp;&nbsp;&nbsp;&nbsp;</span> </a> </td> </tr> </table> <!-- Button : END --> <br> <p style="text-align:center"> Thanks, <br> The Lux Team</p> </td> </tr> </table> </td> </tr> <!-- 1 Column Text + Button : END --> <!-- 2 Even Columns : BEGIN --> <!-- <tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style="padding-bottom: 40px"> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:560px;"> <tr> <td align="center" valign="top" width="50%"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tr> <td style="text-align: center; padding: 0 10px;"> <img src="http://placehold.it/200" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> </td> </tr> <tr> <td style="text-align: center;font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding: 10px 10px 0;" class="stack-column-center"> <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora per conubia nostra, per torquent inceptos&nbsp;himenaeos.</p> </td> </tr> </table> </td> <td align="center" valign="top" width="50%"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tr> <td style="text-align: center; padding: 0 10px;"> <img src="http://placehold.it/200" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> </td> </tr> <tr> <td style="text-align: center;font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding: 10px 10px 0;" class="stack-column-center"> <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora per conubia nostra, per torquent inceptos&nbsp;himenaeos.</p> </td> </tr> </table> </td> </tr> </table> </td> </tr> --> <!-- Two Even Columns : END --> <!-- Clear Spacer : BEGIN --> <!-- <tr> <td aria-hidden="true" height="40" style="font-size: 0; line-height: 0;"> &nbsp; </td> </tr> --> <!-- Clear Spacer : END --> <!-- 1 Column Text : BEGIN --> <!-- <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding: 40px; text-align:center; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> <p style="margin: 0;">Thanks, <br> The Lux Team </p> </td> </tr> </table> </td> </tr> --> <!-- 1 Column Text : END --> </table> <!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px; font-family: sans-serif; color: #888888; font-size: 12px; line-height: 140%;"> <tr> <td style="padding: 40px 10px; width: 100%; font-family: sans-serif; font-size: 12px; line-height: 140%; text-align: center; color: #888888;" class="x-gmail-data-detectors"> <a href="localhost:3000/views/welcome-email.html" style="color: #cccccc; text-decoration: underline; font-weight: bold;">View as a Web Page</a> <br> <!-- Lux Developers --> <br> Alameda, CA, 94501 USA <br> lux.emailer.system@gmail.com <br> <br> <unsubscribe style="color: #888888; text-decoration: underline;">Unsubscribe</unsubscribe> </td> </tr> </table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--> </div> </center></body></html>',

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
         console.log('Welcome email sent to: ' + req.body.email); //: message %s , %s', info.messageId, info.response);
            res.sendFile('index.html');
        });
});

app.post('/login', (req, res) => {
  store
    .authenticate({
      email: req.body.email,
      password: req.body.password
    })
    .then(({ success }) =>{
      if (success) {
         res.sendStatus(200);
        // res.redirect("/admin")
        // res.render('admin', { title: 'Admin Page', adminname: req.body.email });
      }
      else {
        res.sendStatus(401)  //401 is unauthorized
      }
    })
})




app.post('/createLux', (req, res) => {
  store
    .createLux({
      adminname: req.body.adminname,
      adminemail: req.body.adminemail,
      luxname: req.body.luxname,
      luxdescription: req.body.luxdescription,
      q1: req.body.q1,
      q2: req.body.q2
    })
    .then(() => res.sendStatus(200));

//send lux creation info email
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lux.email.system@gmail.com',
            pass: 'stevegregg'
        }
    });
    let mailOptions = {
        from: '"Lux Email System" <lux.email.system@gmail.com>', // sender address
        to: req.body.adminemail, // list of receivers
        subject: 'Your Lux: '+ req.body.luxname + ' is ready!',       // Subject line
        text: "You can now send out your Lux to your community.", // plain text body
        html: '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <meta charset="utf-8"> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldnt be necessary --> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title> Your Lux is ready </title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset : BEGIN --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin: 0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode: bicubic; } /* What it does: A work-around for email clients meddling in triggered links. */ *[x-apple-data-detectors], /* iOS */ .x-gmail-data-detectors, /* Gmail */ .x-gmail-data-detectors *, .aBn { border-bottom: 0 !important; cursor: default !important; color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */ .a6S { display: none !important; opacity: 0.01 !important; } /* If the above doesn"t work, add a .g-img class to any image in question. */ img.g-img + div { display: none !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89 */ /* Create one of these media queries for each additional viewport size you"d like to fix */ /* Thanks to Eric Lepetit (@ericlepetitsf) for help troubleshooting */ @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */ .email-container { min-width: 375px !important; } } @media screen and (max-width: 480px) { /* What it does: Forces Gmail app to display email full width */ div > u ~ div .gmail { min-width: 100vw; } } </style> <!-- CSS Reset : END --> <!-- Progressive Enhancements : BEGIN --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 600px) { /* What it does: Adjust typography on small screens to improve readability */ .email-container p { font-size: 17px !important; } } </style> <!-- Progressive Enhancements : END --> <!-- What it does: Makes background images in 72ppi Outlook render at correct size. --> <!--[if gte mso 9]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--></head><body width="100%" bgcolor="#222222" style="margin: 0; mso-line-height-rule: exactly;"> <center style="width: 100%; background: #222222; text-align: left;"> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> Thank you for joining Lux! You can now sign in to your account. </div> <!-- Visually Hidden Preheader Text : END --> <!-- Set the email width. Defined in two places: 1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px. 2. MSO tags for Desktop Windows Outlook enforce a 600px width. --> <div style="max-width: 600px; margin: auto;" class="email-container"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;"> <tr> <td style="padding: 20px 0; text-align: center"> <!-- <img src="http://placehold.it/200x50" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> --></td> </tr> </table> <!-- Email Header : END --> <!-- Email Body : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;"> <!-- Hero Image, Flush : BEGIN --> <tr> <td bgcolor="#ffffff" align="center"> <br> <br> <img src="https://i.imgur.com/tiPG1bm.png" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; margin: auto;" class="g-img"> </td> </tr> <!-- Hero Image, Flush : END --> <!-- 1 Column Text + Button : BEGIN --> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding: 30px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> <h2 style="margin: 0 0 10px 0; text-align: center; font-family: sans-serif; font-size: 22px; line-height: 130%; color: #333333; font-weight: bold;">' + req.body.adminname + ', your Lux: ' + req.body.luxname + ' has been created! </h2> <br> <p style="margin: 0; text-align: center; "> Description: ' + req.body.luxdescription + '</p> <br> <p style="margin: 0; text-align: center; "> Question 1: ' + req.body.q1 + '</p> <br> <p style="margin: 0; text-align: center; "> Questoin 2: ' + req.body.q2 + '</p> </td> </tr> <tr> <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 125%; color: #333333; text-align: center;">You can see your full Lux by clicking below.</h2> <br> <!-- Button : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;"> <tr> <td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td"> <a href="localhost:3000/#signin" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 110%; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a"> <span style="color:#ffffff;" class="button-link">&nbsp;&nbsp;&nbsp;&nbsp;Go to ' + req.body.luxname + '&nbsp;&nbsp;&nbsp;&nbsp;</span> </a> </td> </tr> </table> <!-- Button : END --> <br> </td> </tr> </table> </td> </tr> <!-- 1 Column Text + Button : END --> <!-- 2 Even Columns : BEGIN --> <!-- <tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style="padding-bottom: 40px"> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:560px;"> <tr> <td align="center" valign="top" width="50%"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tr> <td style="text-align: center; padding: 0 10px;"> <img src="http://placehold.it/200" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> </td> </tr> <tr> <td style="text-align: center;font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding: 10px 10px 0;" class="stack-column-center"> <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora per conubia nostra, per torquent inceptos&nbsp;himenaeos.</p> </td> </tr> </table> </td> <td align="center" valign="top" width="50%"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tr> <td style="text-align: center; padding: 0 10px;"> <img src="http://placehold.it/200" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> </td> </tr> <tr> <td style="text-align: center;font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding: 10px 10px 0;" class="stack-column-center"> <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora per conubia nostra, per torquent inceptos&nbsp;himenaeos.</p> </td> </tr> </table> </td> </tr> </table> </td> </tr> --> <!-- Two Even Columns : END --> <!-- Clear Spacer : BEGIN --> <tr> <td aria-hidden="true" height="40" style="font-size: 0; line-height: 0;"> &nbsp; </td> </tr> <!-- Clear Spacer : END --> <!-- 1 Column Text : BEGIN --> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td style="padding: 40px; text-align:center; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;"> <p> As always, if you have any questions, feel free to reach out to us by responding to this email or by sending a note to lux.emailer.system@gmail.com. </p> <br> <p style="margin: 0;">Thanks, <br> The Lux Team </p> </td> </tr> </table> </td> </tr> <!-- 1 Column Text : END --> </table> <!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px; font-family: sans-serif; color: #888888; font-size: 12px; line-height: 140%;"> <tr> <td style="padding: 40px 10px; width: 100%; font-family: sans-serif; font-size: 12px; line-height: 140%; text-align: center; color: #888888;" class="x-gmail-data-detectors"> <a href="localhost:3000/views/welcome-email.html" style="color: #cccccc; text-decoration: underline; font-weight: bold;">View as a Web Page</a> <br> <!-- Lux Developers --> <br> Alameda, CA, 94501 USA <br> lux.emailer.system@gmail.com <br> <br> <unsubscribe style="color: #888888; text-decoration: underline;">Unsubscribe</unsubscribe> </td> </tr> </table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--> </div> </center></body></html>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
         console.log('Welcome email sent to: ' + req.body.adminemail); //: message %s , %s', info.messageId, info.response);
            res.sendFile('index.html');
     });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
