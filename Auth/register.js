import RegisterUsers from "../Schema/register.js";
import { sendRegistrationPendingEmail} from "../mailService/mail.js"; // Import your email sending functions
const registerUser = async (req, res) => {
  try {
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
      
    } = req.body;

    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await RegisterUsers.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userStatus = "pending";
    // Create a new user with the specified status
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
      isConfirmed: userStatus, // Set the status based on branchManagerApproval
    });

    // Save the user to the database
    await newUser.save();

    // Send a registration Pending email
    try {
      await sendRegistrationPendingEmail(email);
    } catch (error) {
      console.error("Error sending registration Pending email", error);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerUser;
