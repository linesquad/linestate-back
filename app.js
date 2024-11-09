import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import postRoute from "./routes/post.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import testRoute from "./routes/test.js";
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use(express.json());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

app.listen(process.env.DEV_PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.DEV_PORT || 8000}`);
});
