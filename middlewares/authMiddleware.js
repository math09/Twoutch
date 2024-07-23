import config from "../config/config.js";
import jwt from "jsonwebtoken";

function generateAccessToken(params) {
    return jwt.sign(params, config.jwtSecret, {
      expiresIn: "3600s",
    }); // token valide pendant 1h
}

function authenticateToken(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

export default {
    authenticateToken, generateAccessToken
}