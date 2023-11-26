const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { id: userId } = req.params;
  const basket = req.body;
  console.log(basket);
  for (const restaurant of basket) {
    const order = await Order.create({
      user: userId,
      restaurant: restaurant.restaurant._id,
      items: restaurant.items,
    });
    const total = restaurant.items.reduce((acc, item) => {
      return acc + item.food.price * item.quantity;
    }, 0);

    order.total = total + 15000;
    await order.save();
  }
  res.status(StatusCodes.OK).json({ msg: "Success" });
};

const updateOrderStatus = async (req, res) => {
  console.log("order");

  const { id: orderId } = req.params;
  const { status } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new CustomError.NotFoundError(`No order with ID: ${orderId}`);
  }
  order.status = status;
  await order.save();
  res.status(StatusCodes.OK).json({ msg: "updated status" });
};

const getRestaurantOrder = async (req, res) => {
  const { id: restaurantId } = req.params;
  const order = await Order.find({ restaurant: restaurantId })
    .populate([
      {
        path: "items.food",
      },
      {
        path: "user",
      },
    ])
    .sort({ updatedAt: 1 });
  res.status(StatusCodes.OK).json(order);
};

const getAllOrder = async (req, res) => {
  const { id: userId } = req.params;
  const { status } = req.query;
  const queryObject = { user: userId };
  if (status) {
    queryObject.status = status;
  }
  const order = await Order.find(queryObject)
    .populate([
      {
        path: "restaurant",
        select: "name image",
      },
      { path: "items.food", select: "name" },
    ])
    .sort({ updatedAt: -1 });
  console.log("order");
  console.log(order);
  res.status(StatusCodes.OK).json(order);
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findById(orderId)
    .populate([
      {
        path: "restaurant",
        select: "name image",
      },
      { path: "items.food" },
    ])
    .sort({ updatedAt: -1 });
  res.status(StatusCodes.OK).json(order);
};
module.exports = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrderStatus,
  getRestaurantOrder,
};
