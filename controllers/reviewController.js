const { StatusCodes } = require("http-status-codes");
const Restaurant = require("../models/Restaurant");
const CustomError = require("../errors");

const getRestaurantReview = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId).select("reviews");
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  res.status(StatusCodes.OK).json({ restaurant });
};

const createReview = async (req, res) => {
  const { id: restaurantId } = req.params;
  const { user, rating, comment } = req.body;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  const newReview = { user, rating, comment };
  restaurant.reviews.push(newReview);
  await restaurant.save();
  res
    .status(StatusCodes.OK)
    .json({ success: true, review: newReview, restaurant });
};

module.exports = { getRestaurantReview, createReview };
