const express = require("express");
const router = express.Router();

const {
  getAllFoods,
  getSingleFood,
  createFood,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

router.route("/").get(getAllFoods).post(createFood);
router.route("/:id").get(getSingleFood).delete(deleteFood).patch(updateFood);

module.exports = router;
