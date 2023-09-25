const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUser = async (req, res) => {
  const user = await User.find().select("-password");
  res.status(StatusCodes.OK).json({ user });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with ID: ${userId}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findById(req.user.userId);
  const isCorrectPassword = await user.comparePassword(oldPassword);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  user.password = newPassword;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Success! Password updated." });
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
