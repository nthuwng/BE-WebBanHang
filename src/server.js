require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const app = express();
const connection = require("./config/database");
const userRouter = require("./routes/userAPI");
const adminRouter = require("./routes/adminAPI");
const fileUpload = require("express-fileupload");
const webRouter = require("./routes/web");


const port = process.env.PORT;
const hostname = process.env.HOST_NAME;


app.use(fileUpload());
app.use(express.json()); // Used to parse JSON bodies (dùng để lấy dữ liệu từ body của request)
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies ( dùng để lấy dữ liệu từ form)

configViewEngine(app);

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/", webRouter);

(async () => {
  try {
    await connection();

    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log("error connect to database", error);
  }
})();
