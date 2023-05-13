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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const helpers_1 = require("../utils/helpers");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req.user.role === "ADMIN")) {
            throw new helpers_1.CustomError("User is Not Authorized to Perform this Action", 401);
        }
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
exports.isAdmin = isAdmin;
exports.default = exports.isAdmin;
