import express from 'express';
import dotenv from "dotenv"

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

import { auth } from "express-openid-connect"

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});