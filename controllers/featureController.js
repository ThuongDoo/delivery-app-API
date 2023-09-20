const { StatusCodes } = require("http-status-codes");
const Feature = require("../models/Feature");
const Food = require("../models/Food");
const CustomError = require("../errors");

const getAllFeature = async (req, res) => {
  const { sort } = req.query;
  let result = Feature.find({});

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  const feature = await result.populate("foods");
  res.status(StatusCodes.OK).json({ feature, nbHits: feature.length });
};

const createFeature = async (req, res) => {
  const feature = await Feature.create(req.body);
  res.status(StatusCodes.CREATED).json({ feature });
};

const addFood = async (req, res) => {
  const { id: featureId } = req.params;
  const { foodId } = req.body;
  const food = await Food.findById(foodId);
  if (!food) {
    throw new CustomError.NotFoundError(`No food with ID: ${foodId}`);
  }

  const feature = await Feature.findById(featureId);
  if (!feature) {
    throw new CustomError.NotFoundError(`No feature with ID: ${featureId}`);
  }

  food.discountPercentage = feature.discountPercentage;
  await food.save();

  feature.foods.push(food);
  await feature.save();

  res.status(StatusCodes.CREATED).json({ feature });
};

const deleteFood = async (req, res) => {
  const { id: featureId } = req.params;
  const { foodId } = req.body;
  const food = await Food.findById(foodId);
  if (!food) {
    throw new CustomError.BadRequestError(`No food with ID: ${foodId}`);
  }

  const feature = await Feature.findById(featureId);
  if (!feature) {
    throw new CustomError.BadRequestError(featureId);
  }

  food.discountPercentage = 0;
  await food.save();

  await feature.updateOne({ $pull: { foods: foodId } });

  res.status(StatusCodes.OK).json({ food });
};

const updateFeature = async (req, res) => {
  const { id: featureId } = req.params;
  const { discountPercentage } = req.body;
  const feature = await Feature.findOneAndUpdate({ _id: featureId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!feature) {
    throw new CustomError.NotFoundError(`No feature with ID: ${featureId}`);
  }
  const foodsId = feature.foods;
  const foods = await Food.find({ _id: { $in: foodsId } });
  foods.forEach(async (food) => {
    food.discountPercentage = discountPercentage;
    await food.save();
  });
  res.status(StatusCodes.OK).json({ feature });
};

const deleteFeature = async (req, res) => {
  const { id: featureId } = req.params;
  const feature = await Feature.findOneAndDelete({ _id: featureId });
  if (!feature) {
    throw new CustomError.NotFoundError(`No feture with ID: ${featureId}`);
  }
  const foodsId = feature.foods;
  const foods = await Food.find({ _id: { $in: foodsId } });
  foods.forEach(async (food) => {
    food.discountPercentage = 0;
    await food.save();
  });

  res.status(StatusCodes.OK).json({ feature });
};

module.exports = {
  getAllFeature,
  createFeature,
  addFood,
  deleteFood,
  updateFeature,
  deleteFeature,
};
