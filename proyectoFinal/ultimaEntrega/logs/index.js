import winston from "winston"
const logger = winston.createLogger({
  level: "warn",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ level: "verbose" }),
    new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
})
export default logger
