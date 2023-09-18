const express = require("express");
const router = express.Router();

const {
  getAllRestaurant,
  getSingleRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

router.route("/").get(getAllRestaurant).post(createRestaurant);
router
  .route("/:id")
  .get(getSingleRestaurant)
  .delete(deleteRestaurant)
  .patch(updateRestaurant);

module.exports = router;
