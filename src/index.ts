import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errormiddleware";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
