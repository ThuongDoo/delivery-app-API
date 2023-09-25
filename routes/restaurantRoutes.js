const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllRestaurant,
  getSingleRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

router
  .route("/")
  .get(getAllRestaurant)
  .post(authenticateUser, authorizePermissions("admin"), createRestaurant);
router
  .route("/:id")
  .get(getSingleRestaurant)
  .delete(authenticateUser, authorizePermissions("admin"), deleteRestaurant)
  .patch(authenticateUser, authorizePermissions("admin"), updateRestaurant);

module.exports = router;
