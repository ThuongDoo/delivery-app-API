const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllFeature,
  createFeature,
  addFood,
  deleteFood,
  updateFeature,
  deleteFeature,
} = require("../controllers/featureController");

router
  .route("/")
  .get(getAllFeature)
  .post(authenticateUser, authorizePermissions("admin"), createFeature);
router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateFeature)
  .delete(authenticateUser, authorizePermissions("admin"), deleteFeature);
router
  .route("/foods/:id")
  .post(authenticateUser, authorizePermissions("admin"), addFood)
  .patch(authenticateUser, authorizePermissions("admin"), deleteFood);

module.exports = router;
