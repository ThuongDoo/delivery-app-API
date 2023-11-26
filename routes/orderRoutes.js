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
  updateOrderStatus,
  getRestaurantOrder,
} = require("../controllers/orderController");

router
  .route("/:id")
  .post(authenticateUser, authorizePermissions("user"), createOrder)
  .get(authenticateUser, authorizePermissions("user", "vendor"), getAllOrder)
  .patch(authenticateUser, updateOrderStatus);

router
  .route("/singleOrder/:id")
  .get(
    authenticateUser,
    authorizePermissions("user", "vendor"),
    getSingleOrder
  );

router
  .route("/restaurant/:id")
  .get(authenticateUser, authorizePermissions("vendor"), getRestaurantOrder);
module.exports = router;
