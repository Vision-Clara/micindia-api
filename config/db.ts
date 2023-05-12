import { connect } from "mongoose";
import config from "./main";

const connectDB = async () => {
  try {
    if (!config.MONGODB_URL) {
      console.log("Something went wrong");
    } else {
      await connect(config.MONGODB_URL);
      console.log("DB Connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
