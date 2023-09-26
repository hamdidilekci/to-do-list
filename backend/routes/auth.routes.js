import express from "express";

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

// update a todo item
privateRouter.put("/update-profile", async (req, res) => {
  try {
    const user = await AuthService.update(req.user, req.body);
    res.send(user);
  } catch (error) {
    handleError(error, req, res);
  }
});

export { publicRouter, privateRouter };
