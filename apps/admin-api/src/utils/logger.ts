import pino from "pino"

import {
  withStoragePath,
} from "#utils/pathUtils"

/**
 * Configured Pino logger instance.
 * 
 * - Logs to both console (`pino-pretty`) and daily log file (`logs/YYYY-MM-DD.txt`)
 * - Console logs are colorized.
 * - File logs include response time and status code.
 */
const logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: { colorize: true },
        level: "debug",
      },
      {
        target: "pino/file",
        options: {
          destination: (() => {
            const [date] = new Date()
            .toISOString()
            .split("T")
            return withStoragePath(`logs/${date}.txt`)
          })(),
        },
        level: "info",
      },
    ],
  },
  base: {
    // Adds ISO date to every log entry
    date: (() => `${new Date().toISOString()}`)(),
  },
  formatters: {
    /**
     * Custom log formatter to include status code and response time.
     * 
     * @param logData - Partial log object
     * @returns formatted log object with optional statusCode and responseTime
     */
    log: ({ res, responseTime }) => {
      let statusCode: unknown
      if (res && typeof res === "object" && "statusCode" in res) {
        statusCode = res.statusCode
      }
      return {
        ...(typeof responseTime == "number" ? {
          responseTime: `${responseTime}ms`,
        } : {}),
        statusCode,
      }
    },
  },
})

export default logger
