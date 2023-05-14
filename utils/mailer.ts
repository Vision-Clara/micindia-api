import nodemailer from "nodemailer";
import config from "../config/main";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.SMTP_MAIL_EMAIL,
    pass: config.SMTP_MAIL_PASSWORD,
  },
});

const sendMail = async (
  mailToEmail: string,
  mailSubject: string,
  mailBody: string
) => {
  const mailOptions = {
    from: config.SMTP_MAIL_EMAIL,
    to: mailToEmail,
    subject: mailSubject,
    html: mailBody,
  };
  await transporter.sendMail(mailOptions);
};

export default sendMail;
