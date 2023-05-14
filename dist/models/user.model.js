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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const main_1 = __importDefault(require("../config/main"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../utils/helpers");
const UserSchema = new mongoose_1.default.Schema({
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
        enum: Object.values(helpers_1.LOCATIONS),
        default: helpers_1.LOCATIONS.OTHER,
    },
    status: {
        type: String,
        required: [true, "status Field is Required"],
        enum: Object.values(helpers_1.EMP_STATUS),
        default: helpers_1.EMP_STATUS.NEW_REGISTRATION,
    },
    isActive: {
        type: Boolean,
        required: [true, "isActive Field is Required"],
        default: false,
    },
    role: {
        type: String,
        required: [true, "role Field is Required"],
        enum: Object.values(helpers_1.AUTH_ROLES),
        default: helpers_1.AUTH_ROLES.USER,
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified())
            return next();
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
UserSchema.methods = {
    comparePassword(enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(enteredPassword, this.password);
        });
    },
    getJwtToken() {
        return jsonwebtoken_1.default.sign({
            _id: this._id,
        }, main_1.default.JWT_SECRET, {
            expiresIn: main_1.default.JWT_EXPIRY,
        });
    },
};
const UserModel = mongoose_1.default.model("user", UserSchema);
exports.default = UserModel;
