import mongoose from "mongoose";
// import jwt  from "jsonwebtoken";
// here we have to add the deptartment number as we make them such as our dept number will be 07(computer).
const validDepartments = ["Dept1", "Dept2", "Dept3"];

function generateRandomCartId() {
  return Math.floor(100000 + Math.random() * 900000);
}

const userSchema = new mongoose.Schema({
  //dept, designation, number, username,
  cartId: {
    type: Number,
    unique: true,
  },

  empId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  dept: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validDepartments.includes(value);
      },
      message: "Invalid department",
    },
  },
  role: {
    type: String,
    default: "employee",
  },
  designation: {
    type: String,
  },
  mNumber: {
    type: String,
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
  status: {
    type: String,
    enum: ['approved', 'declined', 'pending'],
    default: 'pending', // Set the default status to pending
  },

});
userSchema.pre("save", function (next) {
  if (!this.cartId) {
    this.cartId = generateRandomCartId();
  }
  next();
});



const registerUsers = mongoose.model("RegisterUsers", userSchema);

export default registerUsers;
