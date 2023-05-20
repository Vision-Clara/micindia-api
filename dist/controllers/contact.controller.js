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
exports.sendMessage = void 0;
const helpers_1 = require("../utils/helpers");
const mailer_1 = __importDefault(require("../utils/mailer"));
const main_1 = __importDefault(require("../config/main"));
/******************************************************
 * @CONTACT
 * @route http://localhost:4000/api/v1/contact
 * @description Controller for sending contact message
 * @parameters  name, email, message
 * @returns An message
 ******************************************************/
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            throw new helpers_1.CustomError("Please fill all details", 400);
        }
        const mailBody = `<div>
                         <p>Dear Admin, 
                         <br/> <br/> We have a message from <strong>${name}</strong>. Please have a look up on it. 
                         <br/> <br/> Sender Email: <i> ${email} </i>
                         <br/> Sender Message: <i> ${message} </i>
                      <div/>`;
        const mailTo = main_1.default.FEEDBACK_MAILERS;
        const mailSubject = "Contact Form Submission";
        yield (0, mailer_1.default)(mailTo, mailSubject, mailBody);
        res.status(200).json({
            success: true,
            message: "Message Sent Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.sendMessage = sendMessage;
