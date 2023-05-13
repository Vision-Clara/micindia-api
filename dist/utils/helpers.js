"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.COOKIE_OPTIONS = exports.AUTH_ROLES = void 0;
var AUTH_ROLES;
(function (AUTH_ROLES) {
    AUTH_ROLES["NEW_USER"] = "NEW_USER";
    AUTH_ROLES["REG_USER"] = "REG_USER";
    AUTH_ROLES["ADMIN"] = "ADMIN";
})(AUTH_ROLES = exports.AUTH_ROLES || (exports.AUTH_ROLES = {}));
exports.COOKIE_OPTIONS = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
};
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.CustomError = CustomError;
