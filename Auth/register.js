import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RegisterUsers from '../Schema/register.js';

const registerUser = async (req, res) => {
  try {
    const {
      empId, username, dept, designation, mNumber, email, password, confirmPass,
    } = req.body;

    // Check if the password and confirm password match
    if (password !== confirmPass) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the user already exists
    const existingUser = await RegisterUsers.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new RegisterUsers({
      empId, username, dept, designation, mNumber, email, password: hashedPassword,confirmPass: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for the user (you may want to customize this)
    const user = { username, email };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET); // Replace with your secret key

    // Return the access token and user data
    return res.status(201).json({ accessToken, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default registerUser;
