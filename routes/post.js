import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../handlers/posthandler.js";

const router = express.Router();

// get posts
router.get("/", getPosts);

// get post
router.get("/:id", getPost);

// create post
router.post("/", verifyToken, createPost);

// update post
router.put("/:id", verifyToken, updatePost);

// delete post
router.delete("/:id", verifyToken, deletePost);

export default router;
