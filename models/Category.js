const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      require: [true, "Please provide category name"],
    },
    image: {
      type: String,
      default: "ha",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
