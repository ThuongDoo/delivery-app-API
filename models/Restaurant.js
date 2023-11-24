const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the user for the review"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating for the review"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"],
    },
    comment: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const RestaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: [true, "Please provide restaurant name"],
    },
    image: {
      type: String,
      default:
        "https://raw.githubusercontent.com/ThuongDoo/images/main/photo1646280815645-1646280816151764748403.webp",
    },
    description: {
      type: String,
      maxlength: 500,
      default: "",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [ReviewSchema],
    food: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    address: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide restaurant user"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

RestaurantSchema.pre("save", function (next) {
  this.numOfReviews = this.reviews.length;

  // Tính toán averageRating
  const sumOfRatings = this.reviews.reduce(
    (total, review) => total + review.rating,
    0
  );
  console.log("sum", sumOfRatings);
  this.averageRating =
    this.numOfReviews > 0 ? sumOfRatings / this.numOfReviews : 0;
  console.log("avg", this.averageRating);
  next();
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
