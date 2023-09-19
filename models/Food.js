const mongoose = require("mongoose");
// const Restaurant = require("./Restaurant");

const FoodSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      require: [true, "Please provide restaurant id"],
    },
    name: {
      type: String,
      maxlength: 50,
      require: [true, "Please provide food name"],
    },
    description: {
      type: String,
      maxlength: 200,
      require: [true, "Please provide food description"],
    },
    price: {
      type: Number,
      require: [true, "Please provide food price"],
    },
    image: {
      type: String,
      default: "nothing",
    },
    category: {
      type: String,
      default: "nothing",
    },
    discountPercentage: {
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

module.exports = mongoose.model("Food", FoodSchema);
