import express from "express";
import { config as dotenvConfig } from "dotenv";
import { connectToMongo } from "./db.js";
const app = express();
import cors from "cors";

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

//testing
app.get("/", (req, res) => {
  res.json({ massage: "Welcome to the IMS Api Server!!" });
});


app.listen(port, () => {
  console.log(`IMS app listening on port http://localhost:${port}`);
});