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
  .post(authenticateUser, authorizePermissions("admin", "vendor"), createFood);
router
  .route("/:id")
  .get(getSingleFood)
  .delete(authenticateUser, authorizePermissions("admin", "vendor"), deleteFood)
  .patch(authenticateUser, authorizePermissions("admin", "vendor"), updateFood);

module.exports = router;
