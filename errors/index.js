const CustomErrorAPI = require("./customErrorAPI");
const NotFoundError = require("./notFoundError");
const BadRequestError = require("./badRequestError");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomErrorAPI,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
};
