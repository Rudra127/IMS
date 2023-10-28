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
    type: Number, // You can adjust the type based on your actual data
  },
});

const cartSchema = mongoose.Schema({
  cartId: {
    type: Number,
    required: true,
    unique: true,
  },
  Products: [productSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
