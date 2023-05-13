import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import config from "../config/main";
import bcrypt from "bcryptjs";

import { IUserDocument } from "../utils/types";
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified()) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods = {
  async comparePassword(enteredPassword: string): Promise<Boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  getJwtToken() {
    return JWT.sign(
      {
        _id: this._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },
};

const UserModel = mongoose.model<IUserDocument>("user", UserSchema);
export default UserModel;
