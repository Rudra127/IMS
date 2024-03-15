import registerBranchUser from "../../Schema/branchmanagerschema.js";
import jwt from "jsonwebtoken";
import { sendRegistrationPendingEmail} from "../../mailService/mail.js"; 

const branchUser = async (req, res) => {
  try {

    const {  email, password, confirmPass } = req.body;

    console.log(req.body);

    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await registerBranchUser.findOne({ email });

    console.log(existingUser);

    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
      const createBranchUser = await registerBranchUser.create(req.body);

      console.log(createBranchUser);

      if (createBranchUser ) {
        const branchToken = jwt.sign(
          { email: email},
          process.env.JWT_SECRET2
        );
        const verifyUrl = `${process.env.CLIENT_URL_4}/branch/verify/${branchToken}`;

        console.log(verifyUrl);
        const panel = "branchmanager";
        res.status(205).json({ message: "please authenticate your self" });
        await sendRegistrationPendingEmail(email);

}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default branchUser;