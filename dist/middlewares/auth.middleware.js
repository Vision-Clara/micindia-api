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
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const helpers_1 = require("../utils/helpers");
const main_1 = __importDefault(require("../config/main"));
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new helpers_1.CustomError("User Not Logged In", 400);
        }
        const decryptToken = jsonwebtoken_1.default.verify(token, main_1.default.JWT_SECRET);
        const user = yield user_model_1.default.findById(decryptToken._id);
        console.log(user);
        if (!user) {
            throw new helpers_1.CustomError("User Not Found", 400);
        }
        req.user = user;
        return next();
    }
    catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.isLoggedIn = isLoggedIn;
exports.default = exports.isLoggedIn;
