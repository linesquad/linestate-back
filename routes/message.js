import express from "express";
import { verifyToken } from "../middleware/verifytoken.js";
import { addMessage } from "../handlers/messagehandler.js";
const router = express.Router();

// add a message
router.post("/:chatId", verifyToken, addMessage);

export default router;
