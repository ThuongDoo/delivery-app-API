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

    order.total = total;
    await order.save();
  }
  res.status(StatusCodes.OK).json({ msg: "Success" });
};
module.exports = { createOrder };
