import express from "express";
import { swaggerUi, swaggerDocs } from "./swagger.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import postRoute from "./routes/post.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import testRoute from "./routes/test.js";
import messageRoute from "./routes/message.js";
import chatRoute from "./routes/chat.js";
import { io } from "./socket.js";
dotenv.config();

const app = express();
app.use(
  cors({ origin: "https://linestate-client.vercel.app", credentials: true })
);
app.use(cookieParser());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/chats", chatRoute);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});

io.attach(server);
