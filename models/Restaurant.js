const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      require: [true, "Please provide restaurant name"],
    },
    image: {
      type: String,
      default:
        "https://raw.githubusercontent.com/ThuongDoo/images/main/photo1646280815645-1646280816151764748403.webp",
    },
    avarageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
