const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    // roles can be a single role or array
    if (typeof roles === "string") {
      roles = [roles];
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Access denied. Token missing." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied. Forbidden role." });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
