import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "https://linestate-client.vercel.app",
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
    console.log(`User added: ${userId}`);
  } else {
    console.log("User already exists");
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });
  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      socket.emit("errorMessage", {
        message: `User with ID ${receiverId} is not online.`,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

export { io };
