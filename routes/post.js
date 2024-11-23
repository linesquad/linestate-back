import express from "express";
import { verifyToken } from "../middleware/verifytoken.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../handlers/posthandler.js";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 *       500:
 *         description: Failed to get posts
 */
router.get("/", getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a specific post by ID
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to get post
 */
router.get("/:id", getPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postData:
 *                 type: object
 *                 description: The data for the new post
 *               postDetail:
 *                 type: object
 *                 description: The details for the new post
 *     responses:
 *       201:
 *         description: Successfully created post
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to create post
 */
router.post("/", verifyToken, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a specific post by ID
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postData:
 *                 type: object
 *                 description: The updated data for the post
 *     responses:
 *       200:
 *         description: Successfully updated post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to update post
 */
router.put("/:id", verifyToken, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a specific post by ID
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to delete post
 */
router.delete("/:id", verifyToken, deletePost);

export default router;
