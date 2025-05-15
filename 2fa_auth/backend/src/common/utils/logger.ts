import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { config } from "../../config/app.config";

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create logger instance
export const logger = createLogger({
  level: config.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: "logs",
      filename: "%DATE%-app.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
