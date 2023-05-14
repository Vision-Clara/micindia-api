import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import UserModel from "../models/user.model";
import { CustomError } from "../utils/helpers";
import { CustomRequest } from "../utils/types";
import config from "../config/main";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.token;

    if (!token) {
      throw new CustomError("User Not Logged In", 400);
    }

    const decryptToken = JWT.verify(token, config.JWT_SECRET);

    const user = await UserModel.findById((<JwtPayload>decryptToken)._id);

    if (!user) {
      throw new CustomError("User Not Found", 400);
    }

    (req as CustomRequest).user = user;

    return next();
  } catch (error: any) {
    console.log(error);

    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export default isLoggedIn;
