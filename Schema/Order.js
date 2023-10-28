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
  quantity: {
    type: Number,
    minimum: 1,
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
    products: [productSchema],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Order = mongoose.model("Orders", OrderSchema);

export default Order;
