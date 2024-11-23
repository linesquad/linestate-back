import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate JWT tokens from cookies.
 */
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log("Received Token:", token);

  if (!token) {
    console.warn("Unauthorized: No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("Token Verification Error:", err);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.userId = payload.id; // Attach user ID to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
