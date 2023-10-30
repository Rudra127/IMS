import jwt from "jsonwebtoken";
import registerUsers from "../Schema/register.js";
const authMiddleware = async (req, res, next) => {
  // Get the token from the request cookies
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "auth requires" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await registerUsers.findOne({ email }).select("email");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request not authenticated" });
  }
};

export default authMiddleware;
