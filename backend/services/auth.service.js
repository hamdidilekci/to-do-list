import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

// commons
import { BadRequestError } from "../common/errors.js";
import checkPassword from "../common/check-password.js";
import hashPassword from "../common/hash-password.js";

export default class AuthService {
  static async signIn({ email, password }) {
    // check if user exists
    const user = await User.findOne({ email }, ["password", "_id"]);
    if (!user) {
      throw new BadRequestError("Email not found");
    }
    // check if password is valid
    const validPassword = await checkPassword(password, user.password);
    if (!validPassword) {
      throw new BadRequestError("Invalid password");
    }

    if (email == null) {
      throw new Error("Invalid credentials");
    }

    const _user = await User.findOne({ email }, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "password",
      "photo",
    ]);

    // sign user in
    return AuthService.signInDirect(_user);
  }

  static async signInDirect(user) {
    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const signInData = {
      user,
      accessToken,
    };

    return signInData;
  }

  static async signUp({ password, email, ...data }) {
    if (!password || !email) {
      throw new BadRequestError("Paths `password` and `email` are required.");
    }
    if (await User.exists({ email })) {
      throw new BadRequestError(`Email address is already in use: ${email}`);
    }

    // create user
    const user = new User({ email, ...data });
    user.password = await hashPassword(password);
    await user.save();

    return user;
  }

  static async update({ firstName, lastName, email }) {
    const user = await User.findOneAndUpdate({ email, firstName, lastName });

    if (!email) {
      throw new BadRequestError("email not found");
    }

    return user;
  }
}
