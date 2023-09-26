import express from "express";
import sendMail from "../common/send-mail.js";
import AuthService from "../services/auth.service.js";
import handleError from "../middleware/handle-error.js";

const privateRouter = express.Router();
const publicRouter = express.Router();

publicRouter.post("/sign-in", async (req, res) => {
  try {
    const signInData = await AuthService.signIn(req.body);

    res.send(signInData);
  } catch (error) {
    handleError(error, req, res);
  }
});

publicRouter.post("/sign-up", async (req, res) => {
  try {
    const user = await AuthService.signUp(req.body);

    // sign user in
    const signInData = await AuthService.signInDirect(user);
    res.send(signInData);
  } catch (error) {
    handleError(error, req, res);
  }
});

// update user profile
privateRouter.put("/update-profile", async (req, res) => {
  try {
    const user = await AuthService.update(req.user, req.body);
    res.send(user);
  } catch (error) {
    handleError(error, req, res);
  }
});

// reset password
privateRouter.post("/reset-password-request", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const { email, subject, payload, template } =
      await AuthService.resetPasswordRequest(userEmail);
    await sendMail(res, email, subject, payload, template);
    res.send("Reset Link Sent To " + email);
  } catch (error) {
    handleError(error, req, res);
  }
});

export { publicRouter, privateRouter };
