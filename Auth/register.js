import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RegisterUsers from "../Schema/register.js";
// import Cart from "../Schema/Cart.js";
// import AddCart from "../Cart/AddCart.js";
const registerUser = async (req, res) => {
  try {

    const {
      cartId, 
      empId,
      username,
      dept,
      designation,
      mNumber,
      email,
      password,
      confirmPass,
    } = req.body;
    const expires = 1000 * 60 * 60 * 24 * 15;

    // Check if the password and confirm password match
    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await RegisterUsers.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    // const saltRounds = 10; 
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new RegisterUsers({
      cartId,
      empId,
      username,
      dept,
      designation,
      mNumber,
      email,
      password: password ,
      confirmPass: password,

    });

    // Save the user to the database
    await newUser.save();

    let token = jwt.sign({ email: email, cartId : cartId }, process.env.JWT_SECRET);
    console.log(token);
    
    res.cookie("Authtoken", token, {
      expires: new Date(Date.now() + expires),
      httpOnly: true,
    });
    console.log("cookie created");
    res.status(200).json({ message: "User created in successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerUser;
