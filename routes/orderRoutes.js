const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const { createOrder } = require("../controllers/orderController");

router
  .route("/:id")
  .post(authenticateUser, authorizePermissions("user"), createOrder);
module.exports = router;
