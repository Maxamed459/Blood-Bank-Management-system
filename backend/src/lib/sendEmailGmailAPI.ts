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

// Helper function to encode email
const encodeMessage = (message: string) => {
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Main function to send blood request email
export const bloodRequestEmail = async (
  donorEmail: string,
  donorName: string,
  requesterName: string,
  bloodType: string,
  hospital: string,
  quantity: number,
  contact: string
) => {
  try {
    // Generate HTML email with Mailgen
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Blood Donation Platform",
        link: "https://bixi-dhiig.vercel.app",
      },
    });

    const emailBody = {
      body: {
        name: donorName,
        intro: `A new blood request has been made by ${requesterName}.`,
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
            color: "#F11A29",
            text: "Confirm Donation",
            link: "https://bixi-dhiig.vercel.app/dashboard",
          },
        },
        outro: "Thank you for being a lifesaver ❤️",
      },
    };

    const htmlEmail = mailGenerator.generate(emailBody);

    // Build raw email
    const message = [
      `From: "Blood Donation Platform" <${EMAIL}>`,
      `To: ${donorEmail}`,
      `Subject: Urgent Blood Request: ${bloodType} needed`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      htmlEmail,
    ].join("\n");

    // Encode email for Gmail API
    const encodedMessage = encodeMessage(message);

    // Send email via Gmail API
    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("✅ Email sent successfully:", result.data.id);
    return result.data;
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message || error);
    throw error;
  }
};
