const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Basket = require("../models/Basket");

const getBasketByUser = async (req, res) => {
  const { id: userId } = req.params;
  let basket = await Basket.findOne({ user: userId }).populate({
    path: "items.food",
  });
  if (!basket) {
    basket = await Basket.create({ user: userId });
  }
  res.status(StatusCodes.OK).json(basket);
};

const updateBasket = async (req, res) => {
  const { id: userId } = req.params;
  const { items } = req.body;
  let basket = await Basket.findOne({ user: userId });
  if (!basket) {
    basket = await Basket.create({ user: userId });
  }
  // basket.items.push(...items);
  for (const item of items) {
    const existingItem = basket.items.find(
      (basketItem) => basketItem.food.toString() === item.food
    );
    console.log(existingItem);
    console.log(item.food);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      basket.items.push(item);
    }
  }
  await basket.save();
  res.status(StatusCodes.OK).json(basket);
};

const deleteItem = async (req, res) => {
  const { userId, foodId } = req.params;
  let basket = await Basket.findOne({ user: userId });
  if (!basket) {
    basket = await Basket.create({ user: userId });
  }

  const deleteItemIndex = basket.items.findIndex(
    (basketItem) => basketItem.food.toString() === foodId
  );
  basket.items.splice(deleteItemIndex, 1);
  await basket.save();
  res.status(StatusCodes.OK).json(basket);
};

module.exports = { getBasketByUser, updateBasket, deleteItem };
