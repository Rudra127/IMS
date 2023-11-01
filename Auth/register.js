import jwt from "jsonwebtoken";
import RegisterUsers from "../Schema/register.js";
import { sendRegistrationConfirmationEmail, sendApprovalNotificationEmail, sendDeclineNotificationEmail} from "../mailService/mail.js"; // Import your email sending functions

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
      branchManagerApproval,
    } = req.body;

    // Check if the password and confirm password match
    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await RegisterUsers.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Set the default userStatus to "pending"
    const userStatus = "approved";

    // If branchManagerApproval is true, set userStatus to "approved"
    // if (branchManagerApproval) {
    //   userStatus = "approved";
    // } else if (branchManagerApproval === false) {
    //   userStatus = "declined";
    // }

    // Create a new user with the specified status
    const newUser = new RegisterUsers({
      cartId,
      empId,
      username,
      dept,
      designation,
      mNumber,
      email,
      password: password,
      confirmPass: password,
      status: userStatus, // Set the status based on branchManagerApproval
    });

    // Save the user to the database
    await newUser.save();

    // Send a registration confirmation email
    try {
      await sendRegistrationConfirmationEmail(email);
    } catch (error) {
      console.error("Error sending registration confirmation email", error);
    }

    // If the user is approved, send an approval email
    if (userStatus === "approved") {
      // Replace 'managerEmail' with the actual manager's email address
      const managerEmail = "teamsquare678@gmail.com"; // Change this to your logic to get the manager's email
      try {
        await sendApprovalNotificationEmail(managerEmail, email);
      } catch (error) {
        console.error("Error sending approval email", error);
      }
    } else if (userStatus === "declined") {
      // If the user is declined, send a decline email
      try {
        await sendDeclineNotificationEmail(managerEmail, email);
      } catch (error) {
        console.error("Error sending decline email", error);
      }
    }

    let token = jwt.sign({ email: email, cartId: cartId }, process.env.JWT_SECRET);
    console.log(token);

    res.cookie("Authtoken", token);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerUser;
