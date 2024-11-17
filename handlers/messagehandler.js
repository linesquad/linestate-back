import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const { chatId } = req.params;
  const { text } = req.body;
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId, userIds: { hasSome: [tokenUserId] } },
    });
    if (!chat) return res.status(404).json({ message: "chat not found" });
    const newMessage = await prisma.message.create({
      data: { text, userId: tokenUserId, chatId },
    });

    await prisma.chat.update({
      where: { id: chatId },
      data: { seenBy: [tokenUserId], lastMessage: text },
    });

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "failed to add message" });
  }
};
