import { Request, Response } from "express";

import UserModel from "../models/user.model";
import { CustomError, COOKIE_OPTIONS } from "../utils/helpers";
import { CustomRequest } from "../utils/types";

/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/v1/signup
 * @description User register Controller for creating new user
 * @parameters name, email, password
 * @returns User Details with Token
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

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    newUser.password = "******";

    const token = newUser.getJwtToken();

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
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
 * @returns User Details with Token
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

    const isPasswordMatched = await existingUser.comparePassword(password);

    if (!isPasswordMatched) {
      throw new CustomError("Password does not match", 400);
    }

    existingUser.password = "******";

    const token = existingUser.getJwtToken();

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      user: existingUser,
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
 * @parameters NA
 * @returns An Logout Message
 ******************************************************/
export const signOut = async (req: Request, res: Response) => {
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

/******************************************************
 * @GET_USER_PROFILE
 * @route http://localhost:4000/api/v1/user
 * @description Fetch One User Profile Controller
 * @parameters userId
 * @returns User Details
 ******************************************************/
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomRequest).user._id;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    user.password = "******";

    const userProfile = {
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      message: "Fetched User Successfully",
      user: userProfile,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @GET_ALL_USERS
 * @route http://localhost:4000/api/v1/user
 * @description Fetch User Details Controller
 * @parameters NA
 * @returns User Details
 ******************************************************/
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find();

    res.status(200).json({
      success: true,
      message: "Fetched Users Successfully",
      users: allUsers,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @GET_USER_BY_ID
 * @route http://localhost:4000/api/v1/user
 * @description Fetch One User Details Controller
 * @parameters userId
 * @returns User Details
 ******************************************************/
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    user.password = "******";

    res.status(200).json({
      success: true,
      message: "Fetched User Successfully",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/******************************************************
 * @DEL_USER_BY_ID
 * @route http://localhost:4000/api/v1/user
 * @description Delete One User Controller
 * @parameters userId
 * @returns User Details
 ******************************************************/
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};
