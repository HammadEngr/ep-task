const winston = require("winston");
const fs = require("fs");
const path = require("path");

const logsDir = "logs";

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}] : ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, "error.log") }),
    new winston.transports.Console(),
  ],
});

module.exports = errorLogger;
