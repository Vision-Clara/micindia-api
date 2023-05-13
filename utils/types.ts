import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  getJwtToken(): string;
  comparePassword(enteredPassword: string): Promise<Boolean>;
}

export interface CustomRequest extends Request {
  user: IUserDocument;
}
