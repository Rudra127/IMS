import registerBranchUser from "../../Schema/branchmanagerschema.js";
import jwt from "jsonwebtoken";

const branchLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await registerBranchUser.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified === false) {
      const branchToken = jwt.sign(
        { email: email, cartId: user.cartId },
        process.env.JWT_SECRET2
      );
      const verifyUrl = `${process.env.CLIENT_URL_4}/branch/verify/${branchToken}`;
      console.log(verifyUrl);
      const panel = "branchmanager";
      return res.status(205).json({ message: "please authenticate your self" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.isConfirmed === "declined") {
      return res.status(403).json({ messgae: "you are unauthorized by admin" });
    }

    // if (user.isConfirmed === "pending") {
    //   return res
    //     .status(402)
    //     .json({ messgae: "you are not authenticated by admin" });
    // }

    if (user.verified === true) {
      // Generate a JWT token
      const token = jwt.sign(
        { email: user.email, cartId: user.cartId },
        process.env.JWT_SECRET
      );

      res
        .status(200)
        .json({ message: "Login successful", token, verified: user.verified });
    }
    // Send the token in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default branchLogin;
