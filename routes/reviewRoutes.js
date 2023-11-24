const express = require("express");
const router = express.Router();

const {
  getRestaurantReview,
  createReview,
} = require("../controllers/reviewController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/:id")
  .get(authenticateUser, getRestaurantReview)
  .patch(authenticateUser, createReview);

module.exports = router;
