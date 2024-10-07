const nodemailer = require("nodemailer");
require("dotenv/config");
const env = process.env;
exports.sendEmail = async (
  res,
  email,
  subject,
  body,
  successMessage,
  errorMessage
) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: env.EMAIL,
        pass: env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: env.EMAIL,
      to: email,
      subject: subject,
      text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.error('Error sending email:', error);
        reject(Error("Error sending email"));
      }
      console.log("Email sent: ", info);
      resolve  ({
        message: "Password reset OTP sent to Your email"
      });
    });
  });
};
