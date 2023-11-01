const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getBasketByUser,
  updateBasket,
  deleteItem,
} = require("../controllers/basketController");

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("user"), getBasketByUser)
  .patch(authenticateUser, authorizePermissions("user"), updateBasket);

router
  .route("/:userId/:foodId")
  .patch(authenticateUser, authorizePermissions("user"), deleteItem);

module.exports = router;
