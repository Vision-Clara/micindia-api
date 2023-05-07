import { connect } from "mongoose";
const { DB_URI } = process.env;

const connectDB = async () => {
  try {
    if (!DB_URI) {
      console.log("Something went wrong");
    } else {
      await connect(DB_URI);
      console.log("DB Connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
