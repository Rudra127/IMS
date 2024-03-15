import mongoose from "mongoose";

function generateRandomCartId() {
  return Math.floor(100000 + Math.random() * 900000);
}

const shopKeeperSchema = new mongoose.Schema({
  cartId: {
    type: Number,
    unique: true,
  },
  shopKeeperId: {
    type: Number, // No need to make it unique
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
  },

  panel: {
    type: String,
    default: "Shopkeeper",
    enum: ["Employee", "Branch Manager", "Shopkeeper"],
  },
  designation: {
    type: String,
  },
  mNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length <= 10;
      },
      message: "mNumber cannot be longer than 10 characters",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPass: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: String,
    enum: ["approved", "declined", "pending"],
    default: "approved",
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});
shopKeeperSchema.pre("save", async function (next) {
  if (!this.cartId) {
    this.cartId = generateRandomCartId();
  }

  next();
});

const shopKeeper = mongoose.model("shopKeeper", shopKeeperSchema);

export default shopKeeper;
