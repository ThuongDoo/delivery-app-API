require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const foodRouter = require("./routes/foodRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const featureRouter = require("./routes/featureRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");

// middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMS: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("<h1>delivery App</h1>");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/features", featureRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
