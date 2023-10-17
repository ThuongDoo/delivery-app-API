const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllFeature,
  createFeature,
  addRestaurant,
  deleteRestaurant,
  updateFeature,
  deleteFeature,
} = require("../controllers/featureController");

router
  .route("/")
  .get(authenticateUser, getAllFeature)
  .post(authenticateUser, authorizePermissions("admin"), createFeature);
router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateFeature)
  .delete(authenticateUser, authorizePermissions("admin"), deleteFeature);
router
  .route("/restaurant/:id")
  .post(authenticateUser, authorizePermissions("admin"), addRestaurant)
  .patch(authenticateUser, authorizePermissions("admin"), deleteRestaurant);

module.exports = router;
