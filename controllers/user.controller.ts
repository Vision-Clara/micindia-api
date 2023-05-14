import e, { Request, Response } from "express";

import UserModel from "../models/user.model";
import { CustomError, COOKIE_OPTIONS } from "../utils/helpers";
import { CustomRequest } from "../utils/types";

/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/v1/signup
 * @description Controller for creating new user
 * @parameters name, email, password
 * @returns New user details with cookie token
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

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @SIGNIN
 * @route http://localhost:4000/api/v1/signin
 * @description Controller for login user
 * @parameters email, password
 * @returns User details with cookie token
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

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @SIGNOUT
 * @route http://localhost:4000/api/v1/signout
 * @description Controller for logout user
 * @parameters NA
 * @returns An Llogout message
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

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @GET_USER_PROFILE
 * @route http://localhost:4000/api/v1/user
 * @description Controller to fetch user profile
 * @parameters userId
 * @returns User profile
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

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @GET_ALL_USERS
 * @route http://localhost:4000/api/v1/user
 * @description Controller to fetch all users details
 * @parameters NA
 * @returns User details
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

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @GET_USER_BY_ID
 * @route http://localhost:4000/api/v1/user/:userId
 * @description Controller to fetch a user details
 * @parameters userId
 * @returns User details
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

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @DEL_USER_BY_ID
 * @route http://localhost:4000/api/v1/user/:userId
 * @description Controller to delete a user
 * @parameters userId
 * @returns Deleted user details
 ******************************************************/
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      user: deletedUser,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @UPDATE_USER_BY_ID
 * @route http://localhost:4000/api/v1/user/:userId
 * @description Controller to update a user
 * @parameters userId
 * @returns Updated User Details
 ******************************************************/
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, branch, status, isActive, role } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      name,
      branch,
      status,
      isActive,
      role,
    });

    user.password = "******";

    res.status(200).json({
      success: true,
      message: "Updated User Successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};
