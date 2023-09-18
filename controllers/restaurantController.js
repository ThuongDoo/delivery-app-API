const { StatusCodes } = require("http-status-codes");
const Restaurant = require("../models/Restaurant");

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
    res.status(StatusCodes.NOT_FOUND).json({ msg: "not found" });
  }
  res.status(StatusCodes.OK).json({ restaurant });
};

const createRestaurant = async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(StatusCodes.CREATED).json({ restaurant });
};

const deleteRestaurant = async (req, res) => {
  res.status(200).json({ msg: "delete restaurant" });
};

const updateRestaurant = async (req, res) => {
  res.status(200).json({ msg: "update restaurant" });
};

module.exports = {
  getAllRestaurant,
  getSingleRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
