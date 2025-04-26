import { google } from "googleapis";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientIdSecret = process.env.GOOGLE_CLIENT_ID_SECRET;

export const oauth2client = new google.auth.OAuth2(
  googleClientId,
  googleClientIdSecret,
  "postmessage"
);
