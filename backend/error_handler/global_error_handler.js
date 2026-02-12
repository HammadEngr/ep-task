const logger = require("../utils/logger");
const errorLogger = require("./error_logger");

function global_error_handler(error, req, res, next) {
  console.log(error);
  const { status = 500, message, data } = error;

  logger.error(`Error: ${message || "Internal server error"}`, {
    path: req.path,
    method: req.method,
    status,
    error: error.stack,
  });

  const errorMessage =
    status === 500 || !message ? "Internal server error" : message;

  const errorResponse = {
    success: false,
    status,
    message: errorMessage,
    ...(data && { data }),
  };

  errorLogger.error(`${error.name}: ${error.message}\nStack: ${error.stack}`);

  res.status(status).json(errorResponse);
}

module.exports = global_error_handler;
