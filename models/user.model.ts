import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import config from "../config/main";
import bcrypt from "bcryptjs";

import { IUserDocument } from "../utils/types";
import { AUTH_ROLES, EMP_STATUS, LOCATIONS } from "../utils/helpers";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "name Field is Required"],
      match: [/^[a-zA-Z\s]+$/, "Invalid Username"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "email Field is Required"],
      match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "password Field is Required"],
      minLength: [8, "Password should be minimum 8 characters"],
    },
    branch: {
      type: String,
      required: [true, "location Field is Required"],
      enum: Object.values(LOCATIONS),
      default: LOCATIONS.OTHER,
    },
    status: {
      type: String,
      required: [true, "status Field is Required"],
      enum: Object.values(EMP_STATUS),
      default: EMP_STATUS.NEW_REGISTRATION,
    },
    isActive: {
      type: Boolean,
      required: [true, "isActive Field is Required"],
      default: false,
    },
    role: {
      type: String,
      required: [true, "role Field is Required"],
      enum: Object.values(AUTH_ROLES),
      default: AUTH_ROLES.USER,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified()) return next();

  const password = await bcrypt.hash(this.password, 10);
  if (!password) {
    this.password = password;
  }

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
