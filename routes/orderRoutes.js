const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  createOrder,
  getAllOrder,
  getSingleOrder,
} = require("../controllers/orderController");

router
  .route("/:id")
  .post(authenticateUser, authorizePermissions("user"), createOrder)
  .get(authenticateUser, authorizePermissions("user", "vendor"), getAllOrder);

router
  .route("/singleOrder/:id")
  .get(
    authenticateUser,
    authorizePermissions("user", "vendor"),
    getSingleOrder
  );
module.exports = router;
