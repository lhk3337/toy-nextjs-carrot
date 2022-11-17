import nodemailer from "nodemailer";

export default function sendEmail(email: string, payload: string) {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_SEND_MAIL,
    to: email,
    subject: "캐럿마켓 인증 요청 메일입니다.",
    html: `
    <div style="width:300px">
      <p style="padding: 10px;border-radius:10px;background-color:#fb923c;width:300px;text-align:center;color:#ffff;font-size: 30px; margin-bottom:20px">
        인증번호
      </p>
      <p style="color:#fb923c; font-weight:bold; font-size:20px; text-align:center">${payload}</p>
    </div>
  `,
  };
  const emailConfig = nodemailer.createTransport({
    service: "Naver",
    port: 465,
    host: "smtp.naver.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NEXT_PUBLIC_SEND_MAIL_USER,
      pass: process.env.NEXT_PUBLIC_SEND_MAIL_PASSWORD,
    },
  });
  return emailConfig.sendMail(mailOptions, (error) => error && console.log(error));
}
