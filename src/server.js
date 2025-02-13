require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const app = express();
const webRouter = require("./routes/web");

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
configViewEngine(app);

app.use("/xyz", webRouter);

app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});
