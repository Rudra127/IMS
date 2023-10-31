import express from "express";
import { config as dotenvConfig } from "dotenv";
import { connectToMongo } from "./db.js";
const app = express();
import cors from "cors";
import registerUser from "./Auth/register.js";
import loginUsers from "./Auth/login.js";
import productCreate from "./Products/createProduct.js";
import productDelete from "./Products/deleteProduct.js";
import productGet from "./Products/getProduct.js";
import productUpdate from "./Products/updateProduct.js";
import AddCart from "./Cart/AddCart.js";
import { GetCarts } from "./Cart/GetCarts.js";
import { CreateOrder } from "./Orders/CreateOrder.js";
import { GetOrders } from "./Orders/GetOrders.js";
import { DeleteOrders } from "./Orders/DeleteOrder.js";
import { UpdateOrder } from "./Orders/UpdateOrder.js";
import logout from "./Auth/logout.js";
import cookieParser from 'cookie-parser';
import authMiddleware from "./Middleware/auth.js";
import isLoggedIn from "./Middleware/islogin.js";
// import jsonwebtoken from "jsonwebtoken";
// const jwt = require("jsonwebtoken");
// import authMiddleware from "./Middleware/auth.js";





dotenvConfig();
// conncted to db
const db = connectToMongo();

const port = 4469;
app.use(express.json());
app.use(
  cors({
    // origin: [process.env.CLIENT_URL_1, process.env.CLIENT_URL_2],
    origin: [process.env.CLIENT_URL_1, process.env.CLIENT_URL_2],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

//user Endpoints
app.post("/register", registerUser);
  
app.post("/login", loginUsers);

app.get("/logout", logout);

//middleware for all 
app.use(cookieParser());
app.use(authMiddleware);
app.use(isLoggedIn);
//create product
app.post("/cproducts", productCreate);

//update product
app.post("/uProducts", productUpdate);

//get product
app.get("/gProducts", productGet);

//delete product
app.post("/dProducts", productDelete);




// orbit's area //

app.post("/CreateCart", AddCart);
app.get("/GetCarts", GetCarts);

app.post("/CreateOrder", CreateOrder);
app.get("/GetOrders", GetOrders);
app.post("/UpdateOrder", UpdateOrder);
app.post("/DeleteOrder", DeleteOrders);

// orbit's area END //

//testing
app.get("/", (req, res) => {
  res.json({ massage: "Welcome to the IMS Api Server!!" });
});

app.listen(port, () => {
  console.log(`IMS app listening on port http://localhost:${port}`);
});
