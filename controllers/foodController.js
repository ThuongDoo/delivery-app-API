const { StatusCodes } = require("http-status-codes");
const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");
const CustomError = require("../errors");

const getAllFoods = async (req, res) => {
  const food = await Food.find({});
  res.status(200).json({ food, nbHits: food.length });
};

const getSingleFood = async (req, res) => {
  const { id: foodId } = req.params;
  const food = await Food.findOne({ _id: foodId });
  if (!food) {
    throw new CustomError.NotFoundError(`No food with id: ${foodId}`);
  }
  console.log(food);
  res.status(StatusCodes.OK).json({ food });
};

const createFood = async (req, res) => {
  const food = req.body;
  const restaurant = await Restaurant.findById(food.restaurant);
  console.log(food);
  if (!restaurant) {
    res.status(404).json({ msg: "no restaurant" });
  }
  const newFood = await Food.create(food);
  console.log(newFood);

  // Cập nhật trường foods trong nhà hàng để thêm món ăn mới
  restaurant.food.push(newFood);
  await restaurant.save();

  res.status(201).json({ food: newFood });
};

const deleteFood = async (req, res) => {
  const { id: foodId } = req.params;
  // const {restaurantId} = req.body
  const food = await Food.findOneAndDelete({ _id: foodId });
  if (!food) {
    throw new CustomError.NotFoundError(`No food with ID: ${foodId}`);
  }

  // const restaurant = await Restaurant.findById(restaurantId)
  // if(!restaurant){
  //   throw new CustomError.NotFoundError(`No restaurant with ID: ${restaurantId}`)
  // }
  res.status(StatusCodes.OK).json({ food });
};

const updateFood = async (req, res) => {
  const { id: foodId } = req.params;
  const food = await Food.findOneAndUpdate({ _id: foodId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).send({ food });
};

module.exports = {
  getAllFoods,
  getSingleFood,
  createFood,
  deleteFood,
  updateFood,
};
