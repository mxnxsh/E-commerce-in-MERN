import MailConfig from './../config/mail.config.js';
import nodemailer from 'nodemailer';

class MailService {
   /**
    * @description Create an instance of MailService
    */
   constructor() {
      this.transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: MailConfig.MAIL_USERNAME,
            pass: MailConfig.MAIL_PASSWORD,
         },
      });
   }

   async sendMail(mailOptions) {
      try {
         this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
         });
         return { success: true };
      } catch (err) {
         return { success: false, error: err };
      }
   }
}

export default MailService;
