import express from "express";
import dotenv from "dotenv";
import postRoute from "./routes/post.js";
import authRoute from "./routes/auth.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.DEV_PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.DEV_PORT || 8000}`);
});
