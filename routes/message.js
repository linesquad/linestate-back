import express from "express";
import { verifyToken } from "../middleware/verifytoken.js";
import { addMessage } from "../handlers/messagehandler.js";

const router = express.Router();

/**
 * @swagger
 * /messages/{chatId}:
 *   post:
 *     summary: Add a new message to a chat
 *     tags: [Message]
 *     parameters:
 *       - name: chatId
 *         in: path
 *         required: true
 *         description: The ID of the chat to which the message will be added
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the message
 *     responses:
 *       200:
 *         description: Successfully added message
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Failed to add message
 */
router.post("/:chatId", verifyToken, addMessage);

export default router;
