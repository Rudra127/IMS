import registerUsers from "../Schema/register.js";
// import  bcrypt  from 'bcrypt'; // Import the bcrypt library

const loginUsers = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const existUser = await registerUsers.findOne({ email });

    if (existUser) {
      

    if (password === existUser.password) {

      res.status(200).json({ message: "User logged in successfully" });

   
    }

    else{
      // If the user exists and the password is correct, you can consider the user logged in
      res.status(401).json({ message: "Incorrect password" });


    }
    }
    else{
      
      res.status(404).json({ message: "User not found" });
    
  }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUsers;
