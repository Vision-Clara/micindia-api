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
exports.deleteUserById = exports.getUserById = exports.getAllUsers = exports.getUserProfile = exports.signOut = exports.signIn = exports.signUp = void 0;
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
            user: newUser,
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
            user: existingUser,
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
 * @parameters NA
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
 * @GET_USER_PROFILE
 * @route http://localhost:4000/api/v1/user
 * @description Fetch One User Profile Controller
 * @parameters userId
 * @returns User Details
 ******************************************************/
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new helpers_1.CustomError("User Not Found", 400);
        }
        user.password = "******";
        const userProfile = {
            name: user.name,
            email: user.email,
        };
        res.status(200).json({
            success: true,
            message: "Fetched User Successfully",
            user: userProfile,
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
exports.getUserProfile = getUserProfile;
/******************************************************
 * @GET_ALL_USERS
 * @route http://localhost:4000/api/v1/user
 * @description Fetch User Details Controller
 * @parameters NA
 * @returns User Details
 ******************************************************/
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
/******************************************************
 * @GET_USER_BY_ID
 * @route http://localhost:4000/api/v1/user
 * @description Fetch One User Details Controller
 * @parameters userId
 * @returns User Details
 ******************************************************/
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new helpers_1.CustomError("User Not Found", 400);
        }
        user.password = "******";
        res.status(200).json({
            success: true,
            message: "Fetched User Successfully",
            user: user,
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
exports.getUserById = getUserById;
/******************************************************
 * @DEL_USER_BY_ID
 * @route http://localhost:4000/api/v1/user
 * @description Delete One User Controller
 * @parameters userId
 * @returns User Details
 ******************************************************/
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new helpers_1.CustomError("User Not Found", 400);
        }
        yield user_model_1.default.findByIdAndDelete(userId);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            user: user,
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
exports.deleteUserById = deleteUserById;
