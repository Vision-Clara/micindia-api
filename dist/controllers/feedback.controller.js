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
exports.sendFeedback = void 0;
const helpers_1 = require("../utils/helpers");
const mailer_1 = __importDefault(require("../utils/mailer"));
const main_1 = __importDefault(require("../config/main"));
const sendFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedbackUser, feedbackType, message } = req.body;
        if (!feedbackUser || !feedbackType || !message) {
            throw new helpers_1.CustomError("Please fill all details", 400);
        }
        const mailBody = `<div>
                         <p>Dear Admin, 
                         <br/> <br/> We have a feedback submission from <strong>${feedbackUser}</strong>, regarding <strong>${feedbackType}</strong>. Please have a look up on it. 
                         <br/> <br/> Feedback Message: <i> ${message} </i>
                      <div/>`;
        const mailTo = main_1.default.FEEDBACK_MAILERS;
        const mailSubject = "Feedback Submission";
        yield (0, mailer_1.default)(mailTo, mailSubject, mailBody);
        res.status(200).json({
            success: true,
            message: "Feedback Sent Successfully",
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
exports.sendFeedback = sendFeedback;
