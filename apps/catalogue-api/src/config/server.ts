import path from "path"
import { fileURLToPath } from "url"

// server port configuration
export const PORT = Number(process.env.PORT)

// allowed origins configuration
export const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "").split(",")

// server path configurations
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const APP_PATH = path.resolve(__dirname, "../..")
export const STORAGE_PATH = path.resolve(__dirname, "../../storage")
export const PUBLIC_PATH = path.resolve(__dirname, "../../public")
