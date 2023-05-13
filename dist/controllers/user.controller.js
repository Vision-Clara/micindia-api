"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.signOut = exports.signIn = exports.signUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const helpers_1 = require("../utils/helpers");
/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/v1/signup
 * @description User register Controller for creating new user
 * @parameters name, email, password
 * @returns User Details with Token
 ******************************************************/
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, } = req.body;
        if (!name || !email || !password) {
            throw new helpers_1.CustomError("Please fill all details", 400);
        }
        //check if user exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            throw new helpers_1.CustomError("User already exist", 400);
        }
        const newUser = yield user_model_1.default.create({
            name,
            email,
            password,
        });
        newUser.password = "******";
        const token = newUser.getJwtToken();
        res.cookie("token", token, helpers_1.COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            message: "User Created Successfully",
            token,
            newUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.signUp = signUp;
/******************************************************
 * @SIGNIN
 * @route http://localhost:4000/api/v1/signin
 * @description User signin Controller for login user
 * @parameters email, password
 * @returns User Details with Token
 ******************************************************/
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, } = req.body;
        if (!email || !password) {
            throw new helpers_1.CustomError("Please fill all details", 400);
        }
        //check if user exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (!existingUser) {
            throw new helpers_1.CustomError("User does not exist", 400);
        }
        const isPasswordMatched = yield existingUser.comparePassword(password);
        if (!isPasswordMatched) {
            throw new helpers_1.CustomError("Password does not match", 400);
        }
        existingUser.password = "******";
        const token = existingUser.getJwtToken();
        res.cookie("token", token, helpers_1.COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            token,
            existingUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.code).json({
            success: false,
            message: error.message,
        });
    }
});
exports.signIn = signIn;
/******************************************************
 * @SIGNOUT
 * @route http://localhost:4000/api/v1/signout
 * @description User signout Controller for logout user
 * @parameters email, password
 * @returns An Logout Message
 ******************************************************/
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "User Logged Out Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.code).json({
            success: false,
            message: error.message,
        });
    }
});
exports.signOut = signOut;
/******************************************************
 * @GET_ALL_USERS
 * @route http://localhost:4000/api/v1/user
 * @description User signout Controller for logout user
 * @parameters email, password
 * @returns User Details
 ******************************************************/
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req.user.role === "ADMIN")) {
            throw new helpers_1.CustomError("User is Not Authorized to Perform this Action", 401);
        }
        const allUsers = yield user_model_1.default.find();
        res.status(200).json({
            success: true,
            message: "Fetched Users Successfully",
            users: allUsers,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(error.code || 500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
