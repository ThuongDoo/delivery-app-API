const Category = require("../models/Category");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllCategory = async (req, res) => {
  let result = Category.find({});
  const { field } = req.query;
  if (field) {
    const fieldList = field.split(",").join(" ");
    result = result.select(fieldList);
  }
  const category = await result;

  res.status(StatusCodes.OK).json({ category });
};

const getSingleCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new CustomError.NotFoundError(`No category with id: ${categoryId}`);
  }

  res.status(StatusCodes.OK).json({ category });
};

const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).send({ category });
};

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findOneAndDelete({ _id: categoryId });
  if (!category) {
    throw new CustomError.NotFoundError(`No category with ID: ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

module.exports = {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getSingleCategory,
};
