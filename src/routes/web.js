const userRouter = require("./userAPI");
const roleRouter = require("./roleAPI");
const paymentMethodRouter = require("./payment_MethodAPI");
const categoryRouter = require("./categoryAPI");
const orderRouter = require("./orderAPI");
const productRouter = require("./productAPI");
const cartsRouter = require("./cartsAPI");
const cartDetailsRouter = require("./cart_detailsAPI");
const orderDetailsRouter = require("./order_detailsAPI");
const shippingAddressRouter = require("./shipping_addressAPI");

const routers = (app) => {
  app.use("/user", userRouter);
  app.use("/role", roleRouter);
  app.use("/payment_method", paymentMethodRouter);
  app.use("/category", categoryRouter);
  app.use("/order", orderRouter);
  app.use("/product", productRouter);
  app.use("/carts", cartsRouter);
  app.use("/cart_details", cartDetailsRouter);
  app.use("/order_details", orderDetailsRouter);
  app.use("/shipping_address", shippingAddressRouter);
};

module.exports = routers;
