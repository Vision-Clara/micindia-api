require("dotenv").config();
const app = require("./app");
const { PORT } = process.env || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
