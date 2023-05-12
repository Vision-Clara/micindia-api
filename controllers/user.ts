import { Request, Response } from "express";
import UserModel, { User } from "../models/user";

import CustomError from "../utils/customError";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/main";
import { COOKIE_OPTIONS } from "../utils/helpers";

/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/v1/signup
 * @description User register Controller for creating new user
 * @parameters name, email, password
 * @returns An Object
 ******************************************************/
export const signUp = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    if (!name || !email || !password) {
      throw new CustomError("Please fill all details", 400);
    }

    //check if user exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new CustomError("User already exist", 400);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: encryptedPassword,
    });

    newUser.password = "******";

    const token = JWT.sign(
      {
        _id: newUser._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      token,
      newUser,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @SIGNIN
 * @route http://localhost:4000/api/v1/signin
 * @description User signin Controller for login user
 * @parameters email, password
 * @returns An Object
 ******************************************************/
export const signIn = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;

    if (!email || !password) {
      throw new CustomError("Please fill all details", 400);
    }

    //check if user exists
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new CustomError("User does not exist", 400);
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      throw new CustomError("Password does not match", 400);
    }

    existingUser.password = "******";

    const token = JWT.sign(
      {
        _id: existingUser._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      token,
      existingUser,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.code).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @SIGNOUT
 * @route http://localhost:4000/api/v1/signout
 * @description User signout Controller for logout user
 * @parameters email, password
 * @returns An Message
 ******************************************************/
export const signOut = (req: Request, res: Response) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.code).json({
      success: false,
      message: error.message,
    });
  }
};
