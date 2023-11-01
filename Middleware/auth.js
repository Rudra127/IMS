import jwt from "jsonwebtoken";
import registerUsers from "../Schema/register.js";
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.Authtoken;
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  } else {
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await registerUsers.findOne({ email }).select("email");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Request not authenticated" });
    }
  }
};
export default authMiddleware;
