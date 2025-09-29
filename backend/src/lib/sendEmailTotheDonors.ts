// send Email for the new registered user
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../config/config";
import Mailgen from "mailgen";

export const bloodRequestEmail = async (
  donorEmail: string,
  donorName: string,
  requesterName: string,
  bloodType: string,
  hospital: string,
  quantity: number,
  contact: string
) => {
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
      name: donorName,
      intro: `A new blood request has been made by **${requesterName}**.`,
      table: {
        data: [
          {
            "Requested Blood Type": bloodType,
            "Quantity Needed (L)": quantity,
            Hospital: hospital,
            Contact: contact,
          },
        ],
      },
      action: {
        instructions:
          "If you are able to donate, please visit the platform and confirm your availability:",
        button: {
          color: "#d32f2f",
          text: "Confirm Donation",
          link: "https://your-platform-link.com/donor-dashboard",
        },
      },
      outro: "Thank you for being a lifesaver ❤️",
    },
  };

  let mail = mailGenerator.generate(email);

  let message = {
    from: EMAIL,
    to: donorEmail,
    subject: `Urgent Blood Request: ${bloodType} needed`,
    html: mail,
  };

  // Verify before sending
  await transporter.verify();
  return await transporter.sendMail(message);
};
