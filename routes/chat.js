import express from "express";
import {
  getChats,
  createChat,
  getChat,
  readChat,
} from "../handlers/chathandler.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

// get all chats
router.get("/", verifyToken, getChats);

// get a chat
router.get("/:id", verifyToken, getChat);

// create a chat
router.post("/", verifyToken, createChat);

// read a chat
router.put("/read/:id", verifyToken, readChat);

export default router;
