const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: [true, "Please provide category name"],
    },
    image: {
      type: String,
      default:
        "https://raw.githubusercontent.com/ThuongDoo/images/main/photo1646280815645-1646280816151764748403.webp",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
