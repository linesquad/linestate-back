import prisma from "../lib/prisma.js";

// get posts
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "failed to get posts" });
  }
};

// get post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "failed to get post" });
  }
};

// create post
export const createPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId; // Changed from req.user.id to req.userId

  // Check if the user is authenticated
  if (!tokenUserId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(201).json(newPost); // Use 201 for resource creation
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "failed to create post" });
  }
};

// update post
export const updatePost = async (req, res) => {
  try {
    res.status(200).json({ message: "post updated" });
  } catch (error) {
    res.status(500).json({ message: "failed to update post" });
  }
};

// delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "unauthorized" });
    }

    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(500).json({ message: "failed to delete post" });
  }
};
