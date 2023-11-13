const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user", "vendor"],
    default: "user",
  },
  image: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/800px-Black_colour.jpg",
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
