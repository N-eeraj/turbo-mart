import pino from "pino"
import pinoHttp from "pino-http"

import {
  withStoragePath,
} from "#utils/pathUtils"

const [date] = new Date()
  .toISOString()
  .split("T")

/**
 * Configured Pino logger instance.
 *
 * - Logs to both console (`pino-pretty`) and daily log file (`logs/YYYY-MM-DD.txt`)
 * - Console logs are colorized.
 * - File logs include response time and status code.
 */
export const logger = pino({
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
          destination: withStoragePath(`logs/${date}.txt`),
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

/**
 * Pino HTTP middleware for logging Express requests.
 *
 * - Logs method, URL, status code, and response time.
 * - Uses `customLogLevel` to determine severity based on response status.
 * - Serializes request to include only method and URL.
 */
export const httpLogger = pinoHttp({
  logger,
  customLogLevel: (res, err) => {
    if (!res.statusCode) return "info"
    if (res.statusCode >= 500 || err) return "error"
    if (res.statusCode >= 400) return "warn"
    return "info"
  },
  serializers: {
    /**
     * Custom request serializer to log only method and URL.
     *
     * @param req - Express request object
     * @returns simplified log object
     */
    req: ({ url, method }) => {
      return {
        url,
        method,
      }
    },
  },
})
