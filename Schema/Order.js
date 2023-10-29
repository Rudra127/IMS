import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  actualQuantity: {
    type: Number,
    minimum: 1,
  },
  updatedQuantity: {
    type: Number,
    minimum: 1,
    default: 0,
  },
  Status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["approved", "canceled", "pending"],
  },
  remarks: {
    type: String,
    default: "",
    // required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    cartId: {
      type: Number,
      required: true,
    },
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "approved", "canceled", "attended"],
    },

    products: [productSchema],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Order = mongoose.model("Orders", OrderSchema);

export default Order;
