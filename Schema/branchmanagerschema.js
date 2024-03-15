import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  branchManagerId: {
    type: Number, 
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName:{
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
  }
});

const registerBranchUser = mongoose.model("registerBranchUser", userSchema);

export default registerBranchUser;
