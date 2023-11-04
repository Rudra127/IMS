import mongoose from "mongoose";

function generateRandomCartId() {
  return Math.floor(100000 + Math.random() * 900000);
}

const userSchema = new mongoose.Schema({
  cartId: {
    type: Number,
    unique: true,
  },
  empId: {
    type: Number, // No need to make it unique
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
  panel: {
    type: String,
    default: "Employee",
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
    default: "pending",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.cartId) {
    this.cartId = generateRandomCartId();
  }

  if (!this.empId) {
    const lastUser = await registerUsers.findOne({}, {}, { sort: { empId: -1 } });
    if (lastUser) {
      this.empId = lastUser.empId + 1;
    } else {
      this.empId = 1;
    }
  }

  next();
});

const registerUsers = mongoose.model("RegisterUsers", userSchema);

export default registerUsers;
