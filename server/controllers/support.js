const nodemailer = require('nodemailer');
require('dotenv').config();

exports.send = (req, res, next) => {
   const output = `
   <h3>Comment from ${req.body.email}</h3>
   <p>
      ${req.body.comment}
   </p>`;
   
   let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });

  let mailOptions = {
     from: `"Bowl Games Support" ${process.env.EMAIL}`,
     to: 'fangerzero@gmail.com',
     subject: `Bowl Games Support: ${req.body.subject}`,
     text: 'This email is from the support form',
     html: output
  };

  transporter.sendMail(mailOptions)
   .then(response => {
      console.log('trans', response);
      res.send('Email has been sent');
   }).catch(err => console.log('error', err));

};
