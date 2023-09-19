const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./customErrorAPI");

class BadRequestError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
