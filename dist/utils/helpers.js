"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.COOKIE_OPTIONS = exports.EMP_STATUS = exports.LOCATIONS = exports.AUTH_ROLES = void 0;
var AUTH_ROLES;
(function (AUTH_ROLES) {
    AUTH_ROLES["USER"] = "USER";
    AUTH_ROLES["ADMIN"] = "ADMIN";
})(AUTH_ROLES = exports.AUTH_ROLES || (exports.AUTH_ROLES = {}));
var LOCATIONS;
(function (LOCATIONS) {
    LOCATIONS["INDORE"] = "INDORE";
    LOCATIONS["BHOPAL"] = "BHOPAL";
    LOCATIONS["JABALPUR"] = "JABALPUR";
    LOCATIONS["HARDA"] = "HARDA";
    LOCATIONS["JAIPUR"] = "JAIPUR";
    LOCATIONS["KHANDAWA"] = "KHANDAWA";
    LOCATIONS["MHOW"] = "MHOW";
    LOCATIONS["OTHER"] = "OTHER";
})(LOCATIONS = exports.LOCATIONS || (exports.LOCATIONS = {}));
var EMP_STATUS;
(function (EMP_STATUS) {
    EMP_STATUS["NEW_REGISTRATION"] = "NEW_REGISTRATION";
    EMP_STATUS["INTERVIEW_PENDING"] = "INTERVIEW_PENDING";
    EMP_STATUS["CONFIRMED_VOLUNTEER"] = "CONFIRMED_VOLUNTEER";
})(EMP_STATUS = exports.EMP_STATUS || (exports.EMP_STATUS = {}));
exports.COOKIE_OPTIONS = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
};
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
