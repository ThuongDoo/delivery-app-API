const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllFoods,
  getSingleFood,
  createFood,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

router
  .route("/")
  .get(getAllFoods)
  .post(authenticateUser, authorizePermissions("admin"), createFood);
router
  .route("/:id")
  .get(getSingleFood)
  .delete(authenticateUser, authorizePermissions("admin"), deleteFood)
  .patch(authenticateUser, authorizePermissions("admin"), updateFood);

module.exports = router;
