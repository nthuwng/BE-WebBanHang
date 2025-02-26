require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const app = express();
const connection = require("./config/database");
const userRouter = require("./routes/userAPI");
const fileUpload = require("express-fileupload");
const webRouter = require("./routes/web");
const roleRouter = require("./routes/roleAPI");
const payment_methodRouter = require("./routes/payment_MethodAPI");
const categoryRouter = require("./routes/categoryAPI");
const orderRouter = require("./routes/orderAPI");
const productRouter = require("./routes/productAPI");
const cartsRouter = require("./routes/cartsAPI");
const cart_detailsRouter = require("./routes/cart_detailsAPI");
const order_detailsRouter = require("./routes/order_detailsAPI");
const shipping_addressRouter = require("./routes/shipping_addressAPI");

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;


app.use(fileUpload());
app.use(express.json()); // Used to parse JSON bodies (dùng để lấy dữ liệu từ body của request)
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies ( dùng để lấy dữ liệu từ form)

configViewEngine(app);

app.use("/", webRouter);
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/payment_method", payment_methodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/carts", cartsRouter);
app.use("/cart_details", cart_detailsRouter);
app.use("/order_details", order_detailsRouter);
app.use("/shipping_address", shipping_addressRouter);



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
