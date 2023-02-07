const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user: '0157cs171087@gmail.com',
        pass: 'tffhgsauoxksifoi'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHtml;
    console.log('gmailll', data);
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, templet){
            if(err){console.log('error in rendering templet',err); return;}
            mailHtml = templet;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplate : renderTemplate
}