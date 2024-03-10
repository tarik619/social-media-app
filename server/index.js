import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRoute from "./routes/users.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error", err));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("welcome bruh!");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log("backend server is running");
});
