import mongoose from "mongoose";

function generateRandomCartId() {
  return Math.floor(100000 + Math.random() * 900000);
}
const userSchema = new mongoose.Schema({
  cartId: {
    type: Number,
    unique: true,
  },
  branchManagerId: {
    type: String,
    default: generateRandomCartId,
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
  dept: {
    type: String,
    required: true,
  },

  mNumber: {
    type: String,
    unique: true,

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
    default: "pending",
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.cartId) {
    this.cartId = generateRandomCartId();
  }

  next();
});

const registerBranchUser = mongoose.model("registerBranchUser", userSchema);

export default registerBranchUser;
