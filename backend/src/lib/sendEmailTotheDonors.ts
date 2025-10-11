import nodemailer from "nodemailer";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  EMAIL,
  OAUTH_REFRESH_TOKEN,
  REDIRECT_URI,
} from "../config/config";
import Mailgen from "mailgen";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI // must match the URI you used to generate refresh token
);

oAuth2Client.setCredentials({
  refresh_token: OAUTH_REFRESH_TOKEN,
});

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
    const accessToken = await oAuth2Client.getAccessToken();

    if (!accessToken || !accessToken.token) {
      throw new Error("Failed to retrieve access token from Google OAuth2");
    }

    // const transporter = nodemailer.createTransport({
    //   auth: {
    //     type: "OAuth2",
    //     user: EMAIL, // must be the same Gmail that owns the client ID/refresh token
    //     clientId: CLIENT_ID,
    //     clientSecret: CLIENT_SECRET,
    //     refreshToken: OAUTH_REFRESH_TOKEN,
    //     accessToken: accessToken.token,
    //   },
    //   connectionTimeout: 60000,
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });


    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Blood Donation Platform",
        link: "https://bixi-dhiig.vercel.app",
      },
    });

    const email = {
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

    const mail = mailGenerator.generate(email);

    const message = {
      from: `Blood Donation Platform <${EMAIL}>`,
      to: donorEmail,
      subject: `Urgent Blood Request: ${bloodType} needed`,
      html: mail,
    };

    // Send directly (skip verify to avoid false failures)
    return await transporter.sendMail(message);
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message || error);
    throw error;
  }
};
