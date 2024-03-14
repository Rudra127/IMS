import registerUsers from "../../Schema/register.js";
import jwt from 'jsonwebtoken';

const authenticateEmployeeAccount = async (req, res) => {

    try {
      const employeeToken = req.params.employeeToken;
      const { email } = jwt.verify(employeeToken, process.env.JWT_SECRET2);
  
      console.log("email: " + email);
      console.log("jwt:", employeeToken)
      const data = await registerUsers.findOne({ email });
  
      if (!data) {
        console.log("Link does not exist");
        return res.status(404).json({ message: "Link does not exist" });
      }
  
      await registerUsers.findOneAndUpdate(
        { email },
        { $set: { verified: true } },
        { new: true }
      );
  
      console.log("Verification successful");
      res.status(200).json({ message: "Verification successful" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "unverified" });
    }
  };
  
export default authenticateEmployeeAccount;