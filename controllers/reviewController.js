const { StatusCodes } = require("http-status-codes");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const CustomError = require("../errors");

const getRestaurantReview = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId)
    .select("reviews")
    .populate({
      path: "reviews.user",
    });
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
  if (!restaurant.reviews) {
    restaurant.reviews = [];
  }
  const review = restaurant.reviews.find(
    (item) => item.user.toString() === user
  );
  const newReview = { user, rating, comment };
  if (!review) {
    restaurant.reviews.push(newReview);
  } else {
    review.rating = rating;
    review.comment = comment;
  }
  await restaurant.save();
  res
    .status(StatusCodes.OK)
    .json({ success: true, review: newReview, restaurant });
};

const getSingleReview = async (req, res) => {
  const { restaurantId, userId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId)
    .select("reviews")
    .populate({
      path: "reviews.user",
    });
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  const review = restaurant.reviews.find(
    (item) => item.user._id.toString() === userId
  );
  return res.status(StatusCodes.OK).json({ success: true, review: review });
};

const updateReview = async (req, res) => {
  const { restaurantId, userId } = req.params;
  const { rating, comment } = req.body;
  const restaurant = await Restaurant.findById(restaurantId).select("reviews");
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  const review = restaurant.reviews.find(
    (item) => item.user.toString() === userId
  );
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review found for user with id: ${userId}`
    );
  }
  review.rating = rating || review.rating;
  review.comment = comment || review.comment;
  await restaurant.save();
  res.status(StatusCodes.OK).json({ success: true, review });
};

const deleteReview = async (req, res) => {
  const { restaurantId, userId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId).select("reviews");
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }

  const filteredReviews = restaurant.reviews.filter(
    (item) => item.user.toString() !== userId
  );
  if (filteredReviews.length === restaurant.reviews.length) {
    throw new CustomError.NotFoundError(
      `No review found for user with id: ${userId}`
    );
  }
  restaurant.reviews = filteredReviews;
  await restaurant.save();
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getRestaurantReview,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
