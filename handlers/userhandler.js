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

    res.status(200).json(updatedUser);
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
