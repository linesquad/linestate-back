import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  savePost,
  getProfilePosts,
  getNotifications,
} from "../handlers/userhandler.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       500:
 *         description: Failed to fetch users
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user
 *               avatar:
 *                 type: string
 *                 description: The new avatar URL for the user
 *               otherFields:
 *                 type: object
 *                 description: Other user fields to update
 *     responses:
 *       200:
 *         description: Successfully updated user
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */
router.put("/:id", verifyToken, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted user
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
router.delete("/:id", verifyToken, deleteUser);

/**
 * @swagger
 * /users/save:
 *   post:
 *     summary: Save or remove a post for the authenticated user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post to save or remove
 *     responses:
 *       200:
 *         description: Successfully saved or removed post
 *       500:
 *         description: Failed to save post
 */
router.post("/save", verifyToken, savePost);

/**
 * @swagger
 * /users/profilePosts:
 *   get:
 *     summary: Get posts for the authenticated user's profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved profile posts
 *       500:
 *         description: Failed to get profile posts
 */
router.get("/profilePosts", verifyToken, getProfilePosts);

/**
 * @swagger
 * /users/notifications:
 *   get:
 *     summary: Get notifications for the authenticated user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved notifications count
 *       500:
 *         description: Failed to get notifications
 */
router.get("/notifications", verifyToken, getNotifications);

export default router;
