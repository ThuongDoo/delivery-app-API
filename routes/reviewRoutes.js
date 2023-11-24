const express = require("express");
const router = express.Router();

const {
  getRestaurantReview,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/:id")
  .get(authenticateUser, getRestaurantReview)
  .patch(authenticateUser, createReview);

router
  .route("/:restaurantId/:userId")
  .get(authenticateUser, getSingleReview)
  .patch(authenticateUser, updateReview);

router
  .route("/delete/:restaurantId/:userId")
  .patch(authenticateUser, deleteReview);

module.exports = router;
