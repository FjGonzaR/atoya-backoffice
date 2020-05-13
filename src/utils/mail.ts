import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EmailContent } from "../types/form";
import "../../config";
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
export const sendEmail = async (payload: EmailContent) => {
  const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );
  OAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const accessToken = await OAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.SOURCE_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
    }
});
  return await transporter.sendMail(payload);
};
