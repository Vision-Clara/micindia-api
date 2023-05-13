import { Request } from "express";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDocument extends IUser, Document {
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
