import prisma from "../lib/prisma.js";

// get all chats
export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIds.find((id) => id !== tokenUserId);
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "failed to get chats" });
  }
};

// get a chat
export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { id } = req.params;
  try {
    const chat = await prisma.chat.findUnique({
      where: { id, userIds: { hasSome: [tokenUserId] } },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: { id },
      data: { seenBy: { set: [tokenUserId] } },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "failed to get chat" });
  }
};

// create a chat
export const createChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIds: [tokenUserId, req.body.reciverId],
      },
    });
    res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "failed to create chat" + error.message });
  }
};

// read a chat
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { id } = req.params;
  try {
    const chat = await prisma.chat.update({
      where: { id, userIds: { hasSome: [tokenUserId] } },
      data: { seenBy: { set: [tokenUserId] } },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "failed to read chat" });
  }
};

// delete a chat
