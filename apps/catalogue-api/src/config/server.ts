import path from "path"
import { fileURLToPath } from "url"

// server port configuration
export const PORT = Number(process.env.PORT)

// server path configurations
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const APP_PATH = path.resolve(__dirname, "../..")
export const STORAGE_PATH = path.resolve(__dirname, "../../storage")
export const PUBLIC_PATH = path.resolve(__dirname, "../../public")
