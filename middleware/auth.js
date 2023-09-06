// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decodedToken = jwt.verify(token, "secret_key");
    const user = await User.findOne({ username: decodedToken.username });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateToken;
