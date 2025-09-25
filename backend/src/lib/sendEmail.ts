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
      intro: `
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://raw.githubusercontent.com/Maxamed459/Blood-Bank-Management-system/main/frontend/public/logo-white.png" 
             alt="Blood Donation Platform Logo" 
             width="140" />
      </div>
      <h2 style="text-align:center; color:#d32f2f;">Welcome to the Blood Donation Platform 🎉</h2>
    `,
      table: {
        data: [
          {
            message:
              "We’re excited to have you onboard! As a registered member, you can request blood when needed and donate to others in urgent need.",
          },
          {
            message:
              "Whenever someone requests your blood type, you’ll receive an instant email notification so you can step in and help at the right time.",
          },
        ],
      },
      outro: "Together, we make a difference. Donate Blood. Save Lives ❤️",
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
