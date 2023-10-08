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
  .get(authenticateUser, getAllRestaurant)
  .post(
    authenticateUser,
    authorizePermissions("admin", "vendor"),
    createRestaurant
  );
router
  .route("/:id")
  .get(getSingleRestaurant)
  .delete(
    authenticateUser,
    authorizePermissions("admin", "vendor"),
    deleteRestaurant
  )
  .patch(
    authenticateUser,
    authorizePermissions("admin", "vendor"),
    updateRestaurant
  );

module.exports = router;
