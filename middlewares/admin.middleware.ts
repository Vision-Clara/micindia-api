import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/helpers";
import { CustomRequest } from "../utils/types";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!((req as CustomRequest).user.role === "ADMIN")) {
      throw new CustomError(
        "User is Not Authorized to Perform this Action",
        401
      );
    }

    return next();
  } catch (error: any) {
    console.log(error);

    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export default isAdmin;
