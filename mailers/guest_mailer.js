const nodemailer = require('../config/nodemailer');

exports.guestInvite = (guest) => {
    let htmlString = nodemailer.renderTemplate({guest: guest}, '/guests/new_guest.ejs');
    console.log('inside new guest mailer', guest);
    nodemailer.transporter.sendMail({
        from: '0157cs171087@gmail.com',
        to: guest.email,
        cc: 'krishna.darshan125@gmail.com',
        subject: 'Guest Invite',
        html: htmlString
    }, (err,info) => {
        if(err){
            console.log('error in sending the mail', err);
            return;
        }
        console.log('Message Sent!', info);
    });
}