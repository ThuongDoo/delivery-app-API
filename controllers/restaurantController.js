const { StatusCodes } = require("http-status-codes");
const Restaurant = require("../models/Restaurant");
const CustomError = require("../errors");
const { default: mongoose } = require("mongoose");

const getAllRestaurant = async (req, res) => {
  const restaurant = await Restaurant.find({}).populate("foods");
  res.status(StatusCodes.OK).json({ restaurant });
};

const getSingleRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ _id: restaurantId }).populate(
    "foods"
  );
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  res.status(StatusCodes.OK).json({ restaurant });
};

const createRestaurant = async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(StatusCodes.CREATED).json({ restaurant });
};

const deleteRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findOneAndDelete({ _id: restaurantId });
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  await mongoose.model("Food").deleteMany({ restaurant: restaurantId });
  res.status(StatusCodes.OK).json({ restaurant });
};

const updateRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = Restaurant.findOneAndUpdate(
    { _id: restaurantId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  res.status(StatusCodes.OK).json({ restaurant });
};

module.exports = {
  getAllRestaurant,
  getSingleRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
