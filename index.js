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
import productDelete from "./Products/deleteProduct.js";
import productUpdate from "./Products/updateProduct.js";
import AddCart from "./Cart/AddCart.js";
import { GetCarts } from "./Cart/GetCarts.js";
import { CreateOrder } from "./Orders/CreateOrder.js";
import { GetOrders } from "./Orders/GetOrders.js";
import { DeleteOrders } from "./Orders/DeleteOrder.js";
import { UpdateOrder } from "./Orders/UpdateOrder.js";
import logout from "./Auth/logout.js";
import UploadBanner from "./Middleware/UploadBanner.js";
import { GetProductImg } from "./GetProductImg.js";
import CreateProducts from "./Products/CreateProducts.js";
import createCategory from "./Category/CreateCategories.js";
import UploadCategoryImg from "./Middleware/UploadCategoryImg.js";
import GetProducts from "./Products/GetProducts.js";
import GetCategory from "./Category/GetCategory.js";
import { GetCategoryImg } from "./GetCategoryImg.js";
import UpdateCategory from "./Category/UpdateCategory.js";
import { deleteImage } from "./DeleteBanner.js";
// import authMiddleware from "./Middleware/auth.js";
// import cookieParser from 'cookie-parser';

dotenvConfig();
// conncted to db
const db = connectToMongo();

const port = 4469;
app.use(express.json());
// app.use(cookieParser());
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
// app.use(authMiddleware);

//create product
app.post("/createProducts", CreateProducts);

//get product
app.get("/GetProducts", GetProducts);

//update product
app.post("/uProducts", productUpdate);

//delete product
app.post("/dProducts", productDelete);

// orbit's area //

app.post("/CreateCart", AddCart);
app.get("/GetCarts", GetCarts);

app.post("/CreateOrder", CreateOrder);
app.get("/GetOrders", GetOrders);
app.post("/UpdateOrder", UpdateOrder);
app.post("/DeleteOrder", DeleteOrders);

app.post(
  "/upload-product-img",
  UploadBanner.single("productImg"),
  async (req, res) => {
    const packageImgPath = req?.file?.path;
    console.log(packageImgPath);
    res
      .status(200)
      .json({ message: "Image uploaded successfully", path: packageImgPath });
  }
);

app.get("/ProductImg/:imageName", GetProductImg);

app.post(
  "/upload-category-img",
  UploadCategoryImg.single("categoryImg"),
  async (req, res) => {
    const packageImgPath = req?.file?.path;
    console.log(packageImgPath);
    res
      .status(200)
      .json({ message: "Image uploaded successfully", path: packageImgPath });
  }
);

app.post("/delete-category-img", async (req, res) => {
  try {
    const { filename } = req.body; // Assuming you send the filename in the request body

    if (!filename) {
      return res
        .status(400)
        .json({ error: "Filename is required in the request body" });
    }

    await deleteImage(filename);

    res.status(200).json({ message: "Banner image deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner image:", error);
    res.status(500).json({ error: "Failed to delete banner image" });
  }
});

app.post("/createCategory", createCategory);
app.get("/GetCategory", GetCategory);
app.post("/UpdateCategory", UpdateCategory);

app.get("/categoryImg/:imageName", GetCategoryImg);

// orbit's area END //

//testing
app.get("/", (req, res) => {
  res.json({ massage: "Welcome to the IMS Api Server!!" });
});

app.listen(port, () => {
  console.log(`IMS app listening on port http://localhost:${port}`);
});
