import RegisterUsers from "../Schema/register.js";
import { sendRegistrationConfirmationEmail, sendApprovalNotificationEmail, sendDeclineNotificationEmail} from "../mailService/mail.js"; // Import your email sending functions
import path from "path";
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

    // Check if the user alr  eady exists
    const existingUser = await RegisterUsers.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Set the default userStatus to "pending"
    let userStatus = "pending";

    // If branchManagerApproval is true, set userStatus to "approved"
    if (branchManagerApproval) {
      userStatus = "approved";
    } else if (branchManagerApproval === false) {
      userStatus = "declined";
    }

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
      isConfirmed: userStatus, // Set the status based on branchManagerApproval
    });

    // Save the user to the database
    await newUser.save();

    // Define the data you want to pass to the EJS template
    const data = {
      firstname: "First Name", // Replace with the actual user's first name
      username: "Username",   // Replace with the actual username
      loginLink: "https://your-login-link.com", // Replace with the actual login link
    };

    // Send a registration confirmation email
    try {
      await sendRegistrationConfirmationEmail(email);
    } catch (error) {
      console.error("Error sending registration confirmation email", error);
    }
    const managerEmail = "teamsquare678@gmail.com"; 
    if (userStatus === "approved") {
      // Replace 'managerEmail' with the actual manager's email address
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
    const registrationData ={
      firstname: req.body.username, // Use the user's first name from the request
      username: req.body.email,   // Use the user's username from the request
      password: req.body.password,
      loginLink: 'https://instagram.com',
 
    }

  console.log(registrationData);
  res.set('Content-Type', 'text/html');
  res.render('registrationconfirm', { data: registrationData });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerUser;
