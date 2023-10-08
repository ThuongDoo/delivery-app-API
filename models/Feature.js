const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeatureSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide feature name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide feature description"],
      maxlength: 200,
    },
    image: {
      type: String,
      default:
        "https://raw.githubusercontent.com/ThuongDoo/images/main/photo1646280815645-1646280816151764748403.webp",
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", FeatureSchema);
