import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../handlers/testhandler.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

// get posts
router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);

// create posts
router.get("/should-be-admin", verifyToken, shouldBeAdmin);

export default router;
