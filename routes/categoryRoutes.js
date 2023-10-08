const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllCategory,
  createCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} = require("../controllers/categoryController");

router
  .route("/")
  .get(getAllCategory)
  .post(authenticateUser, authorizePermissions("admin"), createCategory);
router
  .route("/:id")
  .delete(authenticateUser, authorizePermissions("admin"), deleteCategory)
  .get(authenticateUser, getSingleCategory)
  .patch(updateCategory);

module.exports = router;
