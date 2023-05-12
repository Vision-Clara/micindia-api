import mongoose from "mongoose";
import { Model } from "mongoose";
import { AUTH_ROLES } from "../utils/helpers";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/main";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "UserName Required"],
      match: [/^[a-zA-Z\s]+$/, "Invalid Username"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email Required"],
      match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      minLength: [8, "Password should be minimum 8 characters"],
    },
    role: {
      type: String,
      enum: Object.values(AUTH_ROLES),
      default: AUTH_ROLES.NEW_USER,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("user", UserSchema);
export default UserModel;
