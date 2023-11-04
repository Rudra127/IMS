import RegisterUsers from "../Schema/register.js";
import { sendRegistrationPendingEmail} from "../mailService/mail.js"; 
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const expires = 1000 * 60 * 60 * 24 * 15;

    const {
      cartId,
      empId,
      username,
      fullName,
      dept,
      designation,
      mNumber,
      email,
      password,
      confirmPass,
      panel,
    } = req.body;
console.log(req.body);
    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await RegisterUsers.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userStatus = "pending";

    // Create a new user with the specified status and panel
    const newUser = new RegisterUsers({
      cartId,
      empId,
      username,
      fullName,
      dept,
      designation,
      mNumber,
      email,
      password: password,
      confirmPass: password,
      isConfirmed: userStatus,
      panel: panel, // Set the panel based on the request
    });

    // Save the user to the database
    await newUser.save();

    // Send a registration Pending email
    try {
      await sendRegistrationPendingEmail(email);
    } catch (error) {
      console.error("Error sending registration Pending email", error);
      console.log("Mail sent done");
    }
    if(panel === "Branch Manager"){
      let branchtoken = jwt.sign(
        { email: email, cartId: cartId, panel: panel},
        process.env.JWT_SECRET
      );
      console.log(branchtoken);
      res.cookie("branchAuthtoken", branchtoken, {
        expires: new Date(Date.now() + expires),
        sameSite: "none",
        secure: true,
      });
    }
    console.log("cookie done");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default registerUser;