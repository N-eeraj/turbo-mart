import fs from "fs"
import path from "path"
import morgan from "morgan"

import {
  STORAGE_PATH,
} from "#src/config/server"

const logStream = fs.createWriteStream(path.join(STORAGE_PATH, "logs/log.txt"), { flags: "a" });
const logFormat = "[:date[iso]] :method :url status-code::status :response-time ms"
const logger = morgan(logFormat, {
  stream: logStream,
})

export default logger
