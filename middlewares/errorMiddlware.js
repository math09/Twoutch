import logger from "../utils/logger.js";

// Middleware for 404 error handling
const notFound = (req, res) => {
  logger.error(`Not Found - ${req.originalUrl}`);
  return res.status(404).send("Sorry can't find that!");
};

// Middleware for managing 500 and other errors
const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  const statusCode = err.status || 500;
  return res.status(statusCode).send("Something broke!");
};

export default{
  notFound,
  errorHandler,
};
