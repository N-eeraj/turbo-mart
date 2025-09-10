import {
  pinoHttp,
} from "pino-http"
import {
  type Request,
  type Response,
  type RequestHandler,
} from "express"

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
  customLogLevel: (res: Response, err: Error | null) => {
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
     * 
     * @returns simplified log object
     */
    req: ({ url, method }: Request) => {
      return {
        url,
        method,
      }
    },
  },
})

export default httpLogger as unknown as RequestHandler
