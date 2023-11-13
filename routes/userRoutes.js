const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

const {
  getAllUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
  showCurrentUser,
  updateImage,
} = require("../controllers/userController");

// router.route("/").get(getAllUser).post(createUser);
// router.route("/:id").get(getSingleUser).patch(updateUser);
// router.route("/updateUserPassword/:id").patch(updateUserPassword);
// router.route("/showMe").get(showCurrentUser);

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUser);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router
  .route("/:id")
  .get(authenticateUser, getSingleUser)
  .patch(authenticateUser, updateImage);

module.exports = router;
