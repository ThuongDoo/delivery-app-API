const { StatusCodes } = require("http-status-codes");
const Feature = require("../models/Feature");
const CustomError = require("../errors");
const Restaurant = require("../models/Restaurant");

const getAllFeature = async (req, res) => {
  const { sort } = req.query;
  let result = Feature.find({});

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  const feature = await result.populate({
    path: "restaurant",
    select: "name image",
  });
  res.status(StatusCodes.OK).json({ feature });
};

const createFeature = async (req, res) => {
  const feature = await Feature.create(req.body);
  res.status(StatusCodes.CREATED).json({ feature });
};

const addRestaurant = async (req, res) => {
  const { id: featureId } = req.params;
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with ID: ${restaurantId}`
    );
  }

  const feature = await Feature.findById(featureId);
  if (!feature) {
    throw new CustomError.NotFoundError(`No feature with ID: ${featureId}`);
  }

  // food.discountPercentage = feature.discountPercentage;
  // await food.save();

  feature.restaurant.push(restaurant);
  await feature.save();

  res.status(StatusCodes.CREATED).json({ feature });
};

const deleteRestaurant = async (req, res) => {
  const { id: featureId } = req.params;
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new CustomError.BadRequestError(
      `No restaurant with ID: ${restaurantId}`
    );
  }

  const feature = await Feature.findById(featureId);
  if (!feature) {
    throw new CustomError.BadRequestError(featureId);
  }

  // food.discountPercentage = 0;
  // await food.save();

  await feature.updateOne({ $pull: { restaurant: restaurantId } });

  res.status(StatusCodes.OK).json({ restaurant });
};

const updateFeature = async (req, res) => {
  const { id: featureId } = req.params;
  // const { discountPercentage } = req.body;
  const feature = await Feature.findOneAndUpdate({ _id: featureId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!feature) {
    throw new CustomError.NotFoundError(`No feature with ID: ${featureId}`);
  }
  // const foodsId = feature.food;
  // const foods = await Food.find({ _id: { $in: foodsId } });
  // foods.forEach(async (food) => {
  //   food.discountPercentage = discountPercentage;
  //   await food.save();
  // });
  res.status(StatusCodes.OK).json({ feature });
};

const deleteFeature = async (req, res) => {
  const { id: featureId } = req.params;
  const feature = await Feature.findOneAndDelete({ _id: featureId });
  if (!feature) {
    throw new CustomError.NotFoundError(`No feture with ID: ${featureId}`);
  }
  // const foodsId = feature.food;
  // const foods = await Food.find({ _id: { $in: foodsId } });
  // foods.forEach(async (food) => {
  //   food.discountPercentage = 0;
  //   await food.save();
  // });

  res.status(StatusCodes.OK).json({ feature });
};

module.exports = {
  getAllFeature,
  createFeature,
  addRestaurant,
  deleteRestaurant,
  updateFeature,
  deleteFeature,
};
