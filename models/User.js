const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide username"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    require: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    require: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
