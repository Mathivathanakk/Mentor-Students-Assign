import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mentorStudentrouter from "./Routers/mentorStudentRouter.js";
import { connectDB } from "./Datebase/config.js";
//importing part

//declaration/initalization
dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api", mentorStudentrouter);

//mongodb connection
connectDB();

//routers
app.get("/", (req, res) => {
  res.status(200).send("App is running successfully");
});

//running port
app.listen(process.env.PORT, () => {
  console.log("App is listening to the port");
});
