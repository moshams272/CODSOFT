import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { httpStatusText } from "./utils/httpStatusText.js";
import userRouter from "./routes/user.route.js"
import taskRouter from "./routes/task.route.js"
import projectRouter from "./routes/project.route.js"

const MONGODB_URL = process.env.MONGODB_URL || "";
const PORT = process.env.PORT || 5555;

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); 
  }
  next();
});

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/users",userRouter);
app.use("/api/tasks",taskRouter);
app.use("/api/projects",projectRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Project Management Tool");
});
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not available",
  });
});
app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({
      status: error.statusText || httpStatusText.ERROR,
      message: error.message,
      code: error.statusCode || 500,
      data: null,
    });
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
