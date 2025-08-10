import fs from "fs"
import morgan from "morgan"

import {
  withStoragePath,
} from "#utils/pathUtils"

const [
  date,
] = new Date()
  .toISOString()
  .split("T")

const logStream = fs.createWriteStream(
  withStoragePath(`logs/${date}.txt`), {
    flags: "a",
  }
)
const logFormat = "[:date[iso]] :method :url status-code::status :response-time ms"

/**
 * Morgan logger middleware configured to log HTTP requests to a dated log file.
 *
 * - Logs are written to `storage/logs/YYYY-MM-DD.txt` in append mode.
 * - Uses ISO date format and includes method, URL, status, and response time.
 * - One log file is created per day based on the current date.
 */
const logger = morgan(logFormat, {
  stream: logStream,
})

export default logger
