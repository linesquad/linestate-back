import express from "express";

const router = express.Router();

// get posts
router.get("/test", (req, res) => {
  res.status(200);
  res.send("posts");
  console.log("posts");
});

// create posts
router.post("/test", (req, res) => {
  res.status(200);
  res.send("posts");
  console.log("posts");
});

// update posts
router.put("/test", (req, res) => {
  res.status(200);
  res.send("posts");
  console.log("posts");
});

// delete posts
router.delete("/test", (req, res) => {
  res.status(200);
  res.send("posts");
  console.log("posts");
});

export default router;
