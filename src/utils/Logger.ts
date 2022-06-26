import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, printf, prettyPrint } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const Logger = createLogger({
  format: combine(colorize(), timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "bot.log", dirname: "logs", maxsize: 1024000, level: "info" }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "exceptions.log", dirname: "logs", maxsize: 1024000, level: "error" }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "rejections.log", dirname: "logs", maxsize: 1024000, level: "error" }),
  ]
});

export default Logger;
