import registerUsers from "../Schema/register.js";
const registerUser = async (req, res) => {
    console.log(req.body);
    const userdata  = req.body;
    try {
        const createUser = await registerUsers.create(userdata);
        res.json({ message: "User Created.", user: createUser });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
export default registerUser;