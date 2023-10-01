const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  console.log(req.signedCookies);
  console.log(token);

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  const { name, userId, role } = isTokenValid({ token });
  req.user = { name, userId, role };
  next();
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
