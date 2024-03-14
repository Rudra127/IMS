import registerBranchUser from "../../Schema/branchmanagerschema.js";
import jwt from 'jsonwebtoken';

const authenticateBrachManagerAccount = async (req, res) => {

    try {
      const branchToken = req.params.branchToken;
      const { email } = jwt.verify(branchToken, process.env.JWT_SECRET2);
  
      console.log("email: " + email);
      console.log("jwt secret ", process.env.JWT_SECRET2);
      const data = await registerBranchUser.findOne({ email });
  
      if (!data) {
        console.log("Link does not exist");
        return res.status(404).json({ message: "Link does not exist" });
      }
  
      await registerBranchUser.findOneAndUpdate(
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
  
export default authenticateBrachManagerAccount;