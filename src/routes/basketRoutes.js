const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getBasketByUser,
  addToBasket,
  deleteItem,
  updateBasket,
} = require("../controllers/basketController");

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("user"), getBasketByUser)
  .patch(authenticateUser, authorizePermissions("user"), addToBasket);

router
  .route("/update/:id")
  .patch(authenticateUser, authorizePermissions("user"), updateBasket);

router
  .route("/:userId/:foodId")
  .patch(authenticateUser, authorizePermissions("user"), deleteItem);

module.exports = router;
