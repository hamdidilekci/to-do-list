import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import Token from "../models/token.model.js";

// commons
import { BadRequestError } from "../common/errors.js";
import checkPassword from "../common/check-password.js";
import hashPassword from "../common/hash-password.js";
import sendMail from "../common/send-mail.js";

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

  static async update(currentUser, { firstName, lastName, avatar }) {
    // update user
    const updatedUser = await User.findOneAndUpdate(
      { _id: currentUser._id },
      {
        firstName,
        lastName,
        avatar,
      },
      {
        new: true,
      }
    );

    return updatedUser;
  }

  // reset password request
  static async resetPasswordRequest(email, res) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("User not found");
    }

    const token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }

    // create random reset token
    let resetToken = crypto.randomBytes(32).toString("hex");

    // hash resetToken
    const hashedToken = await hashPassword(resetToken);

    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
    }).save();

    const clientURL = process.env.CLIENT_URL;

    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

    const mailObject = {
      email: user.email,
      subject: "Password Reset Request",
      payload: { name: user.firstName, link: link },
      template: "./template/request-reset-password.handlebars",
    };

    await sendMail(
      res,
      mailObject.email,
      mailObject.subject,
      mailObject.payload,
      mailObject.template
    );

    return mailObject.email;
  }

  // reset password api
  static async resetPassword(userId, token, password) {
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await checkPassword(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hash = await hashPassword(password);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });

    // sendEmail(
    //   user.email,
    //   "Password Reset Successfully",
    //   {
    //     name: user.name,
    //   },
    //   "./template/resetPassword.handlebars"
    // );
    await passwordResetToken.deleteOne();
    return user;
  }
}
