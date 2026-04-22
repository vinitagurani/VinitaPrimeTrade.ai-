const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // log error first
  logger.error(err.message);

  // send response
  res.status(err.statusCode || 500).json({
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
