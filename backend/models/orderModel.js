const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderDate: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderTime: {
      type: String,
      required: [true, "Please add an order date"],
      trim: true,
    },
    orderAmount: {
      type: Number,
      required: [true, "Please add an order amount"],
      trim: true,
    },
    orderStatus: {
      type: String,
      required: [true, "Please add an order status"],
      trim: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    paymentOption: { type: String }, // New field
    tx_ref: { type: String }, // New field for transaction reference
    paymentStatus: { type: String, default: "Pending" }, // To track payment status
    deliveryMethod: {
      type: String,
      trim: true,
    },
    cartItems: {
      type: [Object],
      required: [true],
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
