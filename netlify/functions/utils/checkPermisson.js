const CustomErrorAPI = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.UserId === resourceUserId.toString()) return;
  throw new CustomErrorAPI.UnauthorizedError(
    "Not authorized to access this route"
  );
};

module.exports = checkPermissions;
