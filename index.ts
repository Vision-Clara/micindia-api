require("dotenv").config();
import app from "./app";
import connectDB from "./config/db";
const { PORT } = process.env || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
