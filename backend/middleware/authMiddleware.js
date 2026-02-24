import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("[authMiddleware] Authorization header:", authHeader);
    if (!authHeader) {
      console.warn("[authMiddleware] No token provided");
      return res.status(401).json({ error: "No token provided" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      console.warn("[authMiddleware] Malformed Authorization header", authHeader);
      return res.status(401).json({ error: "Malformed token" });
    }

    const token = parts[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch (verifyErr) {
      console.warn("[authMiddleware] Token verification failed:", verifyErr.message);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  } catch (err) {
    console.error("[authMiddleware] Unexpected error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
