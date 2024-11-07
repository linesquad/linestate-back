import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use("/api/test", (req, res) => {
  res.send("yayyyy");
});

app.listen(process.env.DEV_PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.DEV_PORT || 8000}`);
});
