require("dotenv").config();
const mockData1 = require("./mockData/restaurants.json");
const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");
const connectDB = require("./db/connect");
const mockData2 = require("./mockData/foods.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Food.create(mockData2);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
