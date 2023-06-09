import { Request, Response } from "express";
import { CustomError } from "../utils/helpers";
import sendMail from "../utils/mailer";
import config from "../config/main";

/******************************************************
 * @CONTACT
 * @route http://localhost:4000/api/v1/contact
 * @description Controller for sending contact message
 * @parameters  name, email, message
 * @returns An message
 ******************************************************/
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      throw new CustomError("Please fill all details", 400);
    }

    const mailBody = `<div>
                         <p>Dear Admin, 
                         <br/> <br/> We have a message from <strong>${name}</strong>. Please have a look up on it. 
                         <br/> <br/> Sender Email: <i> ${email} </i>
                         <br/> Sender Message: <i> ${message} </i>
                      <div/>`;

    const mailTo = config.FEEDBACK_MAILERS;
    const mailSubject = "Contact Form Submission";

    await sendMail(mailTo, mailSubject, mailBody);

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
