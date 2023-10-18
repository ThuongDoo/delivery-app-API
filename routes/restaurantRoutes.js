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
  addCategory,
  deleteCategory,
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

router
  .route("/category/:id")
  .patch(authenticateUser, authorizePermissions("admin", "vendor"), addCategory)
  .delete(
    authenticateUser,
    authorizePermissions("admin", "vendor"),
    deleteCategory
  );

module.exports = router;
