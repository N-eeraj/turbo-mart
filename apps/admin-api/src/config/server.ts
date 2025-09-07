import path from "path"
import {
  fileURLToPath,
} from "url"

// app url configuration
export const APP_URL = process.env.APP_URL

// server port configuration
export const PORT = Number(process.env.PORT)

// allowed origins configuration
export const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "").split(",")

// all folder names
export const STORAGE_DIR_NAME = "/storage"
export const PUBLIC_FILE_STORAGE_DIR_NAME = "/storage/files/public"
export const PRIVATE_FILE_STORAGE_DIR_NAME = "/storage/files/private"
export const PUBLIC_DIR_NAME = "/public"

// server path configurations
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const APP_PATH = path.resolve(__dirname, "../..")
export const STORAGE_PATH = path.resolve(__dirname, `../..${STORAGE_DIR_NAME}`)
export const PUBLIC_FILE_STORAGE_PATH = path.resolve(__dirname, `../..${PUBLIC_FILE_STORAGE_DIR_NAME}`)
export const PRIVATE_FILE_STORAGE_PATH = path.resolve(__dirname, `../..${PRIVATE_FILE_STORAGE_DIR_NAME}`)
export const PUBLIC_PATH = path.resolve(__dirname, `../..${PUBLIC_DIR_NAME}`)
