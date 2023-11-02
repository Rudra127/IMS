import registerUsers from "../Schema/register.js";
// import  bcrypt  from 'bcrypt'; // Import the bcrypt library
import jwt from "jsonwebtoken";
const loginUsers = async (req, res) => {
  try {
    const { email, password, isConfirmed } = await req.body;
    const existUser = await registerUsers.findOne({ email });
    const expires = 1000 * 60 * 60 * 24 * 15;
    if (existUser) {
      if(isConfirmed === "approved") {
        if (password === existUser.password) {
          let token = jwt.sign(
            { email: existUser.email, cartId: existUser.cartId },
            process.env.JWT_SECRET
          );
          console.log(token);
          res.cookie("Authtoken", token, {
            expires: new Date(Date.now() + expires),
            sameSite: "none",
            secure: true,
          });
          console.log("cookie set");
          res.status(200).json({ message: "User logged in successfully" });
        } else {
          // If the user exists and the password is correct, you can consider the user logged in
          res.status(401).json({ message: "Incorrect password" });
        }
      }
        else{
          console.log("you're request is declined or in pending. please contact Branch Manager for this.");
        }
    
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUsers;
