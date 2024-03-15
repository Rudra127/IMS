import registerUsers from "../../Schema/register.js";
import jwt from "jsonwebtoken";

const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await registerUsers.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified === false) {
      const employeeToken = jwt.sign(
        { email: email, cartId: user.cartId },
        process.env.JWT_SECRET2
      );
      const verifyUrl = `${process.env.CLIENT_URL_4}/employee/verify/${employeeToken}`;
      console.log(verifyUrl);
      const panel = "Employee";
      return res.status(400).json({ message: "please authenticate your self" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.isConfirmed === "declined") {
      return res.status(403).json({ message: "you are unauthorized by admin" });
    }

    if (user.isConfirmed === "pending") {
      return res
        .status(406)
        .json({ message: "you are not authenticated by admin" });
    }

    if (user.verified === true && user.isConfirmed === "approved") {
      // Generate a JWT token
      const token = jwt.sign(
        { email: user.email, cartId: user.cartId },
        process.env.JWT_SECRET
      );
      return res
        .status(200)
        .json({ message: "Login successful", token, verified: user.verified });
    }
    // Send the token in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default employeeLogin;
