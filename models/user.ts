import mongoose from "mongoose";
import { AUTH_ROLES } from "../utils/helpers";

const UserSchema = new mongoose.Schema(
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
    },
    role: {
      type: String,
      enum: AUTH_ROLES,
      default: "NEW_USER",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
