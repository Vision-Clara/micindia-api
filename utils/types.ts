import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  branch: string;
  status: string;
  isActive: boolean;
  role: string;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  getJwtToken(): string;
  comparePassword(enteredPassword: string): Promise<Boolean>;
}

export interface CustomRequest extends Request {
  user: IUserDocument;
}
