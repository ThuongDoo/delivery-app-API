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
  deleteMany,
} = require("../controllers/basketController");

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("user"), getBasketByUser)
  .patch(authenticateUser, authorizePermissions("user"), updateBasket)
  .delete(authenticateUser, authorizePermissions("user"), deleteMany);

router
  .route("/:userId/:foodId")
  .patch(authenticateUser, authorizePermissions("user"), deleteItem);

module.exports = router;
