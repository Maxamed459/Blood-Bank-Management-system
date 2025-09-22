// send Email for the new registered user
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../config/config";
import Mailgen from "mailgen";

export const welcomeEmail = async (userEmail: string, fullname: string) => {
  let config = {
    host: "smtp.gmail.com",
    port: 465, // secure SMTP port
    secure: true, // use TLS
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    tls: {
      // 👇 only needed if you still face self-signed cert issues
      rejectUnauthorized: false,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Blood Donation Platform",
      link: "https://talo-plus.vercel.app",
    },
  });

  let email = {
    body: {
      name: fullname,
      intro: "Welcome to the Blood Donation Platform!",
      text: "Since you registered, you can donate blood and also request blood. You will receive an email whenever someone requests your blood type.",
      outro: "Donate Blood. Save Lives ❤️",
    },
  };

  let mail = mailGenerator.generate(email);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Welcoming Blood Donation platform",
    html: mail,
  };

  // Verify before sending
  await transporter.verify();
  return await transporter.sendMail(message);
};
