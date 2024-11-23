import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// get users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to fetch users" });
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to fetch user" });
  }
};

// update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (tokenUserId !== id) {
    return res.status(403).json({ message: "unauthorized" });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to update user" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete user" });
  }
};

// save post
export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: { postId_userId: { postId, userId: tokenUserId } },
    });

    if (savedPost) {
      await prisma.savedPost.delete({ where: { id: savedPost.id } });
      return res.status(200).json({ message: "post removed from saved" });
    } else {
      await prisma.savedPost.create({ data: { postId, userId: tokenUserId } });
      return res.status(200).json({ message: "post saved successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to save post" });
  }
};

// get profile posts
export const getProfilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const profilePosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    const savedPosts = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: { post: true },
    });

    const savedPost = savedPosts.map((post) => post.post);

    res.status(200).json({ profilePosts, savedPost });
  } catch (error) {
    res.status(500).json({ message: "failed to get profile posts" });
  }
};

// get notifications
export const getNotifications = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const number = await prisma.chat.count({
      where: {
        userIds: { hasSome: [tokenUserId] },
        NOT: { seenBy: { hasSome: [tokenUserId] } },
      },
    });

    res.status(200).json(number);
  } catch (error) {
    res.status(500).json({ message: "failed to get notifications" });
  }
};
