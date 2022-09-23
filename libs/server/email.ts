import nodemailer from "nodemailer";
const { SEND_MAIL_USER, SEND_MAIL_PASSWORD } = process.env;
export default function SendEmail() {
  return nodemailer.createTransport({
    service: "Naver",
    port: 587,
    host: "smtp.naver.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: SEND_MAIL_USER,
      pass: SEND_MAIL_PASSWORD,
    },
  });
}
