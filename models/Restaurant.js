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
      default: "ha",
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

RestaurantSchema.pre("deleteOne", async function () {
  console.log("======");
  await this.model("Food").deleteMany({ restaurant: this._id });
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
