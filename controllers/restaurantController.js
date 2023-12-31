const { StatusCodes } = require("http-status-codes");
const Restaurant = require("../models/Restaurant");
const CustomError = require("../errors");
const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");

const getAllRestaurant = async (req, res) => {
  console.log("res");
  const {
    name,
    latitude,
    longitude,
    numericFilters,
    sort,
    field,
    populate,
    category,
  } = req.query;
  const queryObject = {};
  if (req.user.role == "vendor") {
    queryObject.user = req.user.userId;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (latitude) {
    queryObject.latitude = latitude;
  }
  if (longitude) {
    queryObject.longitude = longitude;
  }
  if (category) {
    queryObject.category = category;
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["avarageRating", "numOfReviews"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Restaurant.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if (field) {
    const fieldList = field.split(",").join(" ");
    result = result.select(fieldList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.skip) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  let restaurant;
  if (populate) {
    const populateList = populate.split(",");
    restaurant = await result.populate({ path: "category" }).select("-reviews");
    console.log("populate");
  } else {
    restaurant = await result.select("-reviews");
  }
  res.status(StatusCodes.OK).json({ restaurant, nbHits: restaurant.length });
};

const getSingleRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ _id: restaurantId })
    .populate({
      path: "food",
    })
    .select("-reviews");
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  res.status(StatusCodes.OK).json({ restaurant });
};

const createRestaurant = async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(StatusCodes.CREATED).json({ restaurant });
};

const deleteRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findOneAndDelete({ _id: restaurantId });
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  await mongoose.model("Food").deleteMany({ restaurant: restaurantId });
  res.status(StatusCodes.OK).json({ restaurant });
};

const updateRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: restaurantId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `No restaurant with id: ${restaurantId}`
    );
  }
  res.status(StatusCodes.OK).json({ restaurant });
};

const addCategory = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    res.status(404).json({ msg: "no restaurant" });
    return;
  }
  const { category } = req.body;
  restaurant.category.push(category);
  await restaurant.save();
  res.status(StatusCodes.OK).json({ restaurant });
};

const deleteCategory = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  const { category: categoryId } = req.body;
  const category = await Category.findById(categoryId);
  if (!restaurant) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "No Restaurant Found" });
    return;
  }
  if (!category) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "No Category Foung" });
    return;
  }
  const updateCategories = restaurant.category.filter((cat) => {
    return cat.toString() !== categoryId;
  });
  restaurant.category = updateCategories;
  await restaurant.save();
  res.status(StatusCodes.OK).json({ restaurant });
};

module.exports = {
  getAllRestaurant,
  getSingleRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
  addCategory,
  deleteCategory,
};
