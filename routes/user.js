import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  savePost,
  getProfilePosts,
} from "../handlers/userhandler.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

// get users
router.get("/", getUsers);

// get single user
// router.get("/:id", verifyToken, getSingleUser);

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// save post
router.post("/save", verifyToken, savePost);

// get profile posts
router.get("/profilePosts", verifyToken, getProfilePosts);

export default router;
