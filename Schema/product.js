import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productNumber: {
        type: Number,
        unique: true,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantityInStock: {
        type: Number,
        default: 0,
        required: true,
      },
      availability: {
        type: Boolean,
        default: true,
        required: true,
      },

});

const products = mongoose.model('Products', productSchema);

export default products;