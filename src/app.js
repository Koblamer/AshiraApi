require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// const notFoundMiddleware = require("./middlewares/not-found");
// const errorMiddleware = require("./middlewares/error");
// const rateLimitMiddleware = require("./middlewares/rate-limit");
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");

const authRoute = require("./routes/auth-route");
const orderRoute = require("./routes/order-route");
const paymentRoute = require("./routes/payment-route");
const imageRoute = require("./routes/image-route");
const addressRoute = require("./routes/address-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
// app.use(rateLimitMiddleware);
app.use(express.json());
app.use(express.static("public"));

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/auth", authRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);
app.use("/image", imageRoute);
app.use("/address", addressRoute);
// app.use("/admin",adminRoute);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
