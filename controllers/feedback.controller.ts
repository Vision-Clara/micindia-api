import { Request, Response } from "express";
import { CustomError } from "../utils/helpers";
import sendMail from "../utils/mailer";
import config from "../config/main";

export const sendFeedback = async (req: Request, res: Response) => {
  try {
    const { feedbackUser, feedbackType, message } = req.body;

    if (!feedbackUser || !feedbackType || !message) {
      throw new CustomError("Please fill all details", 400);
    }

    const mailBody = `<div>
                         <p>Dear Admin, 
                         <br/> <br/> We have a feedback submission from <strong>${feedbackUser}</strong>, regarding <strong>${feedbackType}</strong>. Please have a look up on it. 
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