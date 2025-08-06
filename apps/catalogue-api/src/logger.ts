import fs from "fs"
import morgan from "morgan"

import { withStoragePath } from "#utils/pathUtils"

const logStream = fs.createWriteStream(withStoragePath("logs/log.txt"), { flags: "a" });
const logFormat = "[:date[iso]] :method :url status-code::status :response-time ms"
const logger = morgan(logFormat, {
  stream: logStream,
})

export default logger
