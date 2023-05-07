require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = process.env || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
