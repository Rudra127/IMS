import express from "express";
import { config as dotenvConfig } from "dotenv";
import { connectToMongo } from "./db.js";
const app = express();
import cors from "cors";
import registerUser from "./Auth/shopKeeperAuth/register.js";
import loginUsers from "./Auth/shopKeeperAuth/login.js";
import jwt from "jsonwebtoken";
import AddCart from "./Cart/AddCart.js";
import { GetCarts } from "./Cart/GetCarts.js";
import { CreateOrder } from "./Orders/CreateOrder.js";
import { GetOrders } from "./Orders/GetOrders.js";
import { DeleteOrders } from "./Orders/DeleteOrder.js";
import { UpdateOrder } from "./Orders/UpdateOrder.js";
import logout from "./Auth/shopKeeperAuth/logout.js";
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
import cookieParser from "cookie-parser";
import isLoggedIn from "./Middleware/islogin.js";
import { DeleteProductImg } from "./DeleteProductImg.js";
import UpdateProducts, {
  UpdateProductsQty,
} from "./Products/UpdateProducts.js";
import DeleteCategory from "./Category/DeleteCategory.js";
import DeleteProducts from "./Products/DeleteProducts.js";
import CheckMinLimit from "./Products/CheckMinLimit.js";
import GetEmployees from "./Employee/GetEmployees.js";
import UpdateEmployees from "./Employee/UpdateEmployees.js";
import CreateSurveyForm from "./SurveyForm/CreateSurveyForm.js";
import GetSurvey from "./SurveyForm/GetSurvey.js";
import DeleteSurvey from "./SurveyForm/DeleteSurvey.js";
import UpdateSurvey from "./SurveyForm/UpdateSurvey.js";
// import jsonwebtoken from "jsonwebtoken";
// import authMiddleware from "./Middleware/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import { BranchManagerPdfGenerator } from "./PDF Generation/BranchManagerPdfGenerate.js";
import { EmployeePdfGenerator } from "./PDF Generation/EmployeePdfGenerate.js";
import authenticateBrachManagerAccount from "./Auth/branchManagerAuth/authenticate.js";
import branchUser from "./Auth/branchManagerAuth/register.js";
import branchLogin from "./Auth/branchManagerAuth/login.js";
import authenticateEmployeeAccount from "./Auth/employeeAuth/authenticate.js";
import employeeUser from "./Auth/employeeAuth/register.js";
import employeeLogin from "./Auth/employeeAuth/login.js";
import authMiddleware from "./Middleware/auth.js";
import tokenAuthMiddleware from "./Middleware/employeeloginmiddleware.js";
import registerShopKeeper from "./Auth/shopKeeperAuth/register.js";
import shopKeeperLogin from "./Auth/shopKeeperAuth/login.js";
import authenticateShopKeeperAccount from "./Auth/shopKeeperAuth/authenticate.js";
import registerBranchUser from "./Schema/branchmanagerschema.js";
import GetBranchManagers from "./BranchManagers/GetBranchManagers.js";
import GetUser from "./Employee/GetUser.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenvConfig();
// conncted to db
const db = connectToMongo();
const viewsPath = path.join(__dirname, "mailService/views");
app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(cookieParser());

const port = 4469;
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL_1,
      process.env.CLIENT_URL_2,
      process.env.CLIENT_URL_3,
      process.env.CLIENT_URL_4,
    ],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT", "PATCH"], // Corrected "UPDATE" to "UPDATE"
    credentials: true,
    withCredentials: true,
  })
);

app.get("/health", (req, res) => res.status(200).json({ message: "OK" }));
//user Endpoints
//Branch manager auth endpoints
app.get("/branch/verify/:branchToken", authenticateBrachManagerAccount);
app.post("/branchManagerRegister", branchUser);
app.post("/branchLogin", branchLogin);

//Employee auth endpoints
app.post("/employeeLoginMiddleware", tokenAuthMiddleware);
app.get("/employee/verify/:employeeToken", authenticateEmployeeAccount);
app.post("/employeeRegister", employeeUser);
app.post("/employeeLogin", employeeLogin);

app.get("/shopKeeper/verify/:shopKeeperToken", authenticateShopKeeperAccount);
app.post("/shopKeeperRegister", registerShopKeeper);
app.post("/shopKeeperLogin", shopKeeperLogin);

////////////////////////////////////////////////////////////////Unprotected area completed////////////////////////////////////////////////////////////////
app.use(authMiddleware);
app.post("/createProducts", CreateProducts);

app.use("/categoryImg", express.static("categoryImg"));
app.use("/ProductImg", express.static("ProductImg"));

//get product
app.get("/GetProducts", GetProducts);
//update product
app.post("/UpdateProducts", UpdateProducts);
app.post("/UpdateProductsQty", UpdateProductsQty);
app.get("/CheckMinLimit", CheckMinLimit);
//delete product
app.post("/DeleteProducts", DeleteProducts);

app.get("/GetBranchCartId", async (req, res) => {
  console.log(req.cookies);
  const { branchAuthtoken } = req.cookies;
  if (branchAuthtoken) {
    const data = jwt.verify(branchAuthtoken, process.env.JWT_SECRET);
    console.log(data);
    const user = await registerBranchUser.findOne({ email: data.email });
    console.log(user);
    if (user?.cartId) {
      res.status(200).json({ cartId: user.cartId });
    } else {
      res.status(404).json({ message: "cartId not found", isCartId: false });
    }
  }
});

app.get("/GetEMPCartId", (req, res) => {
  console.log(req.cookies);
  const { Authtoken } = req.cookies;
  if (Authtoken) {
    const data = jwt.verify(Authtoken, process.env.JWT_SECRET);
    console.log(data);
    if (data.cartId) {
      res.status(200).json({ cartId: data.cartId });
    } else {
      res.status(404).json({ message: "cartId not found", isCartId: false });
    }
  }
});
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

app.post("/delete-product-img", async (req, res) => {
  try {
    const { filename } = req.body; // Assuming you send the filename in the request body

    if (!filename) {
      return res
        .status(400)
        .json({ error: "Filename is required in the request body" });
    }

    await DeleteProductImg(filename);

    res.status(200).json({ message: "Banner image deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner image:", error);
    res.status(500).json({ error: "Failed to delete banner image" });
  }
});

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
app.post("/DeleteCategory", DeleteCategory);

app.get("/categoryImg/:imageName", GetCategoryImg);

app.get("/GetEmployees", GetEmployees);
app.get("/GetUser", GetUser);
app.get("/GetBranchManagers", GetBranchManagers);
app.post("/UpdateEmployee", UpdateEmployees);

app.post("/CreateSurveyForm", CreateSurveyForm);
app.get("/GetSurvey", GetSurvey);
app.post("/UpdateSurvey", UpdateSurvey);
app.post("/DeleteSurvey", DeleteSurvey);

// PDF Generation //

app.post("/generate-pdf-employee", EmployeePdfGenerator);
app.post("/generate-pdf-branch-manager", BranchManagerPdfGenerator);

// app.post("/CreateSubCategory", CreateSubCategory)

// orbit's area END //

//testing
app.get("/", (req, res) => {
  res.json({ massage: "Welcome to the IMS Api Server!!" });
});

app.listen(port, () => {
  console.log(`IMS app listening on port http://localhost:${port}`);
});
