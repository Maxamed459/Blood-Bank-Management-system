import { google } from "googleapis";
import Mailgen from "mailgen";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  EMAIL,
  OAUTH_REFRESH_TOKEN,
  REDIRECT_URI,
} from "../config/config";

// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

// Gmail API instance
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

// encoding email message from base64 to base64url format required by gmail api
const encodedMessage = (message: string) => {
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// main function of sending email
export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  try {
    // generate html email with mailgen
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Blood Donation Platform",
        link: "https://bixi-dhiig.vercel.app",
      },
    });

    const emailBody = {
      body: {
        name: userName,
        intro: `
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://raw.githubusercontent.com/Maxamed459/Blood-Bank-Management-system/main/frontend/public/logo-dark.png" 
             alt="Blood Donation Platform Logo" 
             width="140" />
      </div>
      <h2 style="text-align:center; color:#d32f2f;">Welcome to the Blood Donation Platform 🎉</h2>
    `,
        action: {
          instructions:
            "We’re excited to have you onboard! As a registered member, you can request blood when needed and donate to others in urgent need.",
          message:
            "Whenever someone requests your blood type, you’ll receive an instant email notification so you can step in and help at the right time.",
          button: {
            color: "#22BC66", // Optional action button color
            text: "visit our platform",
            link: "https://bixi-dhiig.vercel.app/dashboard",
          },
        },
        outro: "Together, we make a difference. Donate Blood. Save Lives ❤️",
      },
    };

    const emailTemplate = mailGenerator.generate(emailBody);

    // email options
    const emailMessage = [
      `From: "Blood Donation Platform" <${EMAIL}>`,
      `To: ${userEmail}`,
      "Subject: Welcome to bixi-dhiig Blood Donation Platform!",
      `Content-Type: text/html; charset="UTF-8"`,
      ``,
      emailTemplate,
    ].join("\n");

    // encode email to base64url format
    const encodedEmail = encodedMessage(emailMessage);

    // send email via gmail api
    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });
    console.log("✅ Email sent successfully:", result.data.id);
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message || error);
    throw error;
  }
};
