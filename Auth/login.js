import registerUsers from "../Schema/register.js";
const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await registerUsers.findOne({ email });

    if (!existUser) {
      // User with the provided   email does not exist
      return res.status(404).json({ message: "User not found" });
    }

    // You should use a password hashing library like bcrypt to compare passwords securely
    // For this example, let's assume a plain text password comparison
    if (existUser.password !== password) {
      // Password is incorrect
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If the user exists and the password is correct, you can consider the user logged in
    res.json({ message: "User logged in successfully", existUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUsers;
