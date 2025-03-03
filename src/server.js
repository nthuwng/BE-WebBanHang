require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const connection = require("./config/database");
const fileUpload = require("express-fileupload");
const routers = require("./routes/web");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || "localhost";

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

configViewEngine(app);
routers(app); //

(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on http://${hostname}:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();
