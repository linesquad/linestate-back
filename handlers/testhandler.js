import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res, next) => {
  console.log(req.userId);
  res.status(200).json({ message: "You are logged in" });
};

export const shouldBeAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Its not a valid token" });
    }

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "You are not an admin" });
    }

    res.status(200).json({ message: "You are an admin" });
  });

  next();
};
