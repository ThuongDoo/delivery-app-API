require("dotenv").config();
const restaurantData = require("./mockData/restaurants.json");
const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");
const connectDB = require("./db/connect");
const mockData2 = require("./mockData/foods.json");

const start = async () => {
  restaurantData.forEach((item) => (item.user = "6527ca9bd8270f0dfaa5b3fd"));
  console.log(restaurantData);
  try {
    await connectDB(process.env.MONGO_URL);
    await Restaurant.create(restaurantData);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
