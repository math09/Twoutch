require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
  jwtSecret: process.env.JWT_SECRET || "secretKey",
};