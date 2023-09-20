const Category = require("../models/Category");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllCategory = async (req, res) => {
  const category = await Category.find({});
  res.status(StatusCodes.OK).json({ category });
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

module.exports = { getAllCategory, createCategory, deleteCategory };
