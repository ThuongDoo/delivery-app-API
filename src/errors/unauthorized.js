const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./customErrorAPI");

class UnauthorizedError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
