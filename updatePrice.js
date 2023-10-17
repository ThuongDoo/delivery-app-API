require("dotenv").config();
const connectDB = require("./db/connect");
const cost = [20000, 15000, 30000];
function getRandomCost() {
  return cost[Math.floor(Math.random() * cost.length)];
}
const Food = require("./models/Food");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const allFoods = await Food.find({});

    // Cập nhật giá của từng món ăn thành giá trị ngẫu nhiên
    for (const food of allFoods) {
      const newPrice = getRandomCost();
      await Food.updateOne({ _id: food._id }, { price: newPrice });
      console.log(`Đã cập nhật giá mới cho ${food.name}: ${newPrice}`);
    }
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
// console.log(getRandomCost());
