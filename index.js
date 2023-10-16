import express from "express";
import { config as dotenvConfig } from "dotenv";
import { connectToMongo } from "./db.js";
const app = express();
import jsonwebtoken from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

import cors from "cors";
// import loginUsers from "./Auth/login.js";
import registerUser from "./Auth/register.js";

dotenvConfig(); 
// conncted to db
const db = connectToMongo();

const port = 4469;
app.use(express.json());
app.use(
  cors({
    // origin: [process.env.CLIENT_URL_1, process.env.CLIENT_URL_2],
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);



//user Endpoints
app.post("/register", registerUser);

app.post("/login", (req, res)=>{
  const { email } = req.body;
  const user = {email: email}
  const accesstoken = jsonwebtoken.sign(user, process.env.JWT_SECRET)
  res.json({accesstoken: accesstoken})
});

//testing
app.get("/", (req, res) => {
  res.json({ massage: "Welcome to the IMS Api Server!!" });
});


app.listen(port, () => {
  console.log(`IMS app listening on port http://localhost:${port}`);
});