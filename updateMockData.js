require("dotenv").config();
const connectDB = require("./db/connect");
const category = [
  {
    _id: "6527cc54d8270f0dfaa5b413",
  },
  {
    _id: "6527cc5fd8270f0dfaa5b419",
  },
  {
    _id: "6527ccd1d8270f0dfaa5b41f",
  },
  {
    _id: "6527cd74d8270f0dfaa5b425",
  },
  {
    _id: "652933e64b4937d466a3e715",
  },
  {
    _id: "652933ec4b4937d466a3e717",
  },
  {
    _id: "652933f84b4937d466a3e719",
  },
  {
    _id: "652934024b4937d466a3e71b",
  },
];
function getRandomIndex() {
  return Math.floor(Math.random() * category.length);
}
const Food = require("./models/Food");
const Restaurant = require("./models/Restaurant");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const result = await Food.updateMany({}, { $unset: { category: "" } });

    // Cập nhật giá của từng món ăn thành giá trị ngẫu nhiên
    // for (const restaurant of allRes) {
    //   const newCate = category[getRandomIndex()];
    //   await Restaurant.updateOne(
    //     { _id: restaurant._id },
    //     { category: newCate }
    //   );
    //   console.log(
    //     `Đã cập nhật category mới cho ${restaurant.name}: ${newCate}`
    //   );
    // }
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
