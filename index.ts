import config from "./config/main";
import app from "./app";
import connectDB from "./config/db";

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
