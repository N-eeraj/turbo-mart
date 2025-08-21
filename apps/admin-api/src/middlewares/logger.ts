import pinoHttp from "pino-http"

import logger from "#utils/logger"

/**
 * Pino HTTP middleware for logging Express requests.
 *
 * - Logs method, URL, status code, and response time.
 * - Uses `customLogLevel` to determine severity based on response status.
 * - Serializes request to include only method and URL.
 */
const httpLogger = pinoHttp({
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

export default httpLogger
