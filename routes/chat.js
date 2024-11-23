import express from "express";
import {
  getChats,
  createChat,
  getChat,
  readChat,
} from "../handlers/chathandler.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats for the authenticated user
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: Successfully retrieved chats
 *       500:
 *         description: Failed to get chats
 */
router.get("/", verifyToken, getChats);

/**
 * @swagger
 * /chats/{id}:
 *   get:
 *     summary: Get a specific chat by ID
 *     tags: [Chat]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the chat to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved chat
 *       500:
 *         description: Failed to get chat
 */
router.get("/:id", verifyToken, getChat);

/**
 * @swagger
 * /chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reciverId:
 *                 type: string
 *                 description: The ID of the receiver
 *     responses:
 *       200:
 *         description: Successfully created chat
 *       500:
 *         description: Failed to create chat
 */
router.post("/", verifyToken, createChat);

/**
 * @swagger
 * /chats/read/{id}:
 *   put:
 *     summary: Mark a chat as read
 *     tags: [Chat]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the chat to mark as read
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully marked chat as read
 *       500:
 *         description: Failed to read chat
 */
router.put("/read/:id", verifyToken, readChat);

export default router;
