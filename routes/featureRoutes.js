const express = require("express");
const router = express.Router();

const {
  getAllFeature,
  createFeature,
  addFood,
  deleteFood,
  updateFeature,
  deleteFeature,
} = require("../controllers/featureController");

router.route("/").get(getAllFeature).post(createFeature);
router.route("/:id").patch(updateFeature).delete(deleteFeature);
router.route("/foods/:id").post(addFood).patch(deleteFood);

module.exports = router;
