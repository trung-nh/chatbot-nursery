const fs = require("fs");
const path = require("path");
const { LOGGING_PATH } = require("../../config/configurations");

/**
 * Log a message to the log file.
 * @param {string} userId - The user ID.
 * @param {string} message - The message to log.
 */
const logMessage = (userId, message, filePath = LOGGING_PATH.PRODUCTION) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [${userId}]: ${message}\n`;
  const logsDir = path.resolve(__dirname, "../../logs");

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  fs.appendFileSync(filePath, logEntry);
};

module.exports = {
  logMessage,
};
