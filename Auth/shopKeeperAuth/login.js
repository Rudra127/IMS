import shopKeeper from "../../Schema/shopKeeper.js";

// import  bcrypt  from 'bcrypt'; // Import the bcrypt library
import jwt from "jsonwebtoken";

const shopKeeperLogin = async (req, res) => {
  try {
    const { email, password, panel } = await req.body;
    const existUser = await shopKeeper.findOne({ email });
    console.log(existUser);
    console.log(panel);

    const expires = 1000 * 60 * 60 * 24 * 15;
    if (existUser) {
      if (password === existUser.password) {
        let shopKeeperAuthToken = jwt.sign(
          { email: email, cartId: existUser.cartId, panel: panel },
          process.env.JWT_SECRET
        );
        console.log(shopKeeperAuthToken);
        res.cookie("shopKeeperAuthToken", shopKeeperAuthToken, {
          expires: new Date(Date.now() + expires),
          sameSite: "none",
          secure: true,
        });
        console.log("branch manager cookie set");
        res.status(200).json({ message: "User logged in successfully" });
      } else {
        // If the user exists and the password is correct, you can consider the user logged in
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default shopKeeperLogin;
