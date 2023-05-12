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
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const customError_1 = __importDefault(require("../utils/customError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const main_1 = __importDefault(require("../config/main"));
const helpers_1 = require("../utils/helpers");
/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/v1/signup
 * @description User register Controller for creating new user
 * @parameters name, email, password
 * @returns An Object
 ******************************************************/
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, } = req.body;
        if (!name || !email || !password) {
            throw new customError_1.default("Please fill all details", 400);
        }
        //check if user exists
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            throw new customError_1.default("User already exist", 400);
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({
            name,
            email,
            password: encryptedPassword,
        });
        newUser.password = "******";
        const token = jsonwebtoken_1.default.sign({
            _id: newUser._id,
        }, main_1.default.JWT_SECRET, {
            expiresIn: main_1.default.JWT_EXPIRY,
        });
        res.cookie("token", token, helpers_1.COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            message: "User created",
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
 * @description User signin Controller for login new user
 * @parameters email, password
 * @returns An Object
 ******************************************************/
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, } = req.body;
        if (!email || !password) {
            throw new customError_1.default("Please fill all details", 400);
        }
        //check if user exists
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser) {
            throw new customError_1.default("User does not exist", 400);
        }
        const isPasswordMatched = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordMatched) {
            throw new customError_1.default("Password does not match", 400);
        }
        existingUser.password = "******";
        const token = jsonwebtoken_1.default.sign({
            _id: existingUser._id,
        }, main_1.default.JWT_SECRET, {
            expiresIn: main_1.default.JWT_EXPIRY,
        });
        res.cookie("token", token, helpers_1.COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            message: "User Logged In",
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
