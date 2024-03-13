import registerUsers from "../../Schema/register.js";
import jwt from "jsonwebtoken";
import { sendRegistrationPendingEmail} from "../../mailService/mail.js"; 

const employeeUser = async (req, res) => {
  try {

    const {  email, password, confirmPass } = req.body;

    console.log(req.body);

    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await registerUsers.findOne({ email });

    console.log(existingUser);

    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
      const createEmployeeUser = await registerUsers.create(req.body);

      console.log(createEmployeeUser);

      if (createEmployeeUser ) {
        const employeeToken = jwt.sign(
          { email: email},
          process.env.JWT_SECRET2
        );
        const verifyUrl = `${process.env.CLIENT_URL_4}/employee/verify/${employeeToken}`;

        console.log(verifyUrl);
        const panel = "employee";
        res.status(205).json({ message: "please authenticate your self" });
        await sendRegistrationPendingEmail(email);

}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default employeeUser;