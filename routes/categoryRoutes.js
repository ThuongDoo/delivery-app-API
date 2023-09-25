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
} = require("../controllers/categoryController");

router
  .route("/")
  .get(getAllCategory)
  .post(authenticateUser, authorizePermissions("admin"), createCategory);
router
  .route("/:id")
  .delete(authenticateUser, authorizePermissions("admin"), deleteCategory);

module.exports = router;
