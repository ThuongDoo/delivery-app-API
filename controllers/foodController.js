const { StatusCodes } = require("http-status-codes");
const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");

const getAllFoods = async (req, res) => {
  res.status(StatusCodes.OK).send("get all foods");
};

const getSingleFood = async (req, res) => {
  res.status(StatusCodes.OK).send("get single food");
};

const createFood = async (req, res) => {
  const { id: restaurantId } = req.params;
  console.log(restaurantId);
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    res.status(404).json({ msg: "no restaurant" });
  }
  const newFood = new Food({
    restaurant: restaurant._id, // Đặt trường restaurant là _id của nhà hàng
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    discountPercentage: req.body.discountPercentage,
  });

  // Lưu món ăn mới vào cơ sở dữ liệu
  const savedFood = await newFood.save();

  // Cập nhật trường foods trong nhà hàng để thêm món ăn mới
  restaurant.foods.push(savedFood);
  await restaurant.save();

  res.status(201).json({ food: savedFood });
};

const deleteFood = async (req, res) => {
  res.status(StatusCodes.OK).send("delete food");
};

const updateFood = async (req, res) => {
  res.status(StatusCodes.OK).send("update food");
};

module.exports = {
  getAllFoods,
  getSingleFood,
  createFood,
  deleteFood,
  updateFood,
};
