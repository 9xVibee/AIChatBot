import { NextFunction, Request, Response } from "express";
import bycrpt from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/token.manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "OK",
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "ERROR",
      cause: err.message,
    });
  }
};

// users sign up
export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Checking that if user already exist or not with same email
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(500).send({
        cause: "User Already exists with this email Id, try another email Id",
      });

    // creating new user in database
    // Hashing the password with bycrpt
    const hashedPassword = await bycrpt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // clearing prev cookie
    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    // Creating new token
    const token = createToken(user._id.toString(), user.email, "7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res.status(201).json({
      message: "User Created Successfully",
      id: user._id.toString(),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "ERROR",
      cause: err.message,
    });
  }
};

// users login up
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    // checking is user exist or not
    if (!existingUser)
      return res.status(401).json({
        cause: "User not exist with same email",
      });

    // checking if password us same or not
    const passwordMatch = await bycrpt.compare(password, existingUser.password);

    if (!passwordMatch)
      return res.status(401).json({
        cause: "Password is wrong",
      });

    // clearing prev cookie
    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    // Creating new token
    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    // sending user id if everything is okay
    return res.status(200).json({
      message: "Ok",
      id: existingUser._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "ERROR",
      cause: err.message,
    });
  }
};
