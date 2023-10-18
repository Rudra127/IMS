import express from "express";
import { config as dotenvConfig } from "dotenv";
import { connectToMongo } from "./db.js";
const app = express();
// import jsonwebtoken from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

import cors from "cors";
// imp  ort loginUsers from "./Auth/login.js";
import registerUser from "./Auth/register.js";
import loginUsers from "./Auth/login.js";
import productCreate from "./Products/createProduct.js";
import productDelete from "./Products/deleteProduct.js";
import productGet from "./Products/getProduct.js";
import productUpdate from "./Products/updateProduct.js";
// import cookieParser from "./CookieParser.js";
// import cookieParser from "./cookieParser"; // Import the cookie-parser middleware

dotenvConfig();
// conncted to db
const db = connectToMongo();

const port = 4469;
app.use(express.json());
// app./use(cookieParser());  
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

app.post("/login", loginUsers);



//product endpoints

//create product
app.post("/cproducts", productCreate);

//update product
app.post("/uProducts", productUpdate);

//get product
app.get("/gProducts", productGet);

//delete product
app.post("/dProducts", productDelete);

//testing
app.get("/", (req, res) => {
  res.json({ massage: "Welcome to the IMS Api Server!!" });
});

app.listen(port, () => {
  console.log(`IMS app listening on port http://localhost:${port}`);
});
