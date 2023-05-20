import { Request, Response } from "express";
import { CustomError } from "../utils/helpers";
import sendMail from "../utils/mailer";
import config from "../config/main";

/******************************************************
 * @FEEDBACK
 * @route http://localhost:4000/api/v1/feedback
 * @description Controller for sending feedback
 * @parameters name, type, message
 * @returns An message
 ******************************************************/
export const sendFeedback = async (req: Request, res: Response) => {
  try {
    const { name, type, message } = req.body;

    if (!name || !type || !message) {
      throw new CustomError("Please fill all details", 400);
    }

    const mailBody = `<div>
                         <p>Dear Admin, 
                         <br/> <br/> We have a feedback submission from <strong>${name}</strong>, regarding <strong>${type}</strong>. Please have a look up on it. 
                         <br/> <br/> Feedback Message: <i> ${message} </i>
                      <div/>`;

    const mailTo = config.FEEDBACK_MAILERS;
    const mailSubject = "Feedback Submission";

    await sendMail(mailTo, mailSubject, mailBody);

    res.status(200).json({
      success: true,
      message: "Feedback Sent Successfully",
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
