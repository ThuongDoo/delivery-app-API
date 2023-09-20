const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/").get(getAllCategory).post(createCategory);
router.route("/:id").delete(deleteCategory);

module.exports = router;
