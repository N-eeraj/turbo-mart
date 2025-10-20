import path from "path"
import {
  fileURLToPath,
} from "url"

import env from "@app/load-env"

export const ENVIRONMENT = env.ENVIRONMENT

// url configurations
export const APP_URL = process.env.APP_URL
export const ADMIN_UI_URL = process.env.ADMIN_UI_URL

// server port configuration
export const APP_PORT = Number(process.env.APP_PORT)

// allowed origins configuration
export const ALLOWED_ORIGINS = [
  APP_URL,
  ADMIN_UI_URL,
]

// all folder names
export const STORAGE_DIR_NAME = "/storage"
export const PUBLIC_FILE_STORAGE_DIR_NAME = "/storage/files/public"
export const PRIVATE_FILE_STORAGE_DIR_NAME = "/storage/files/private"
export const PUBLIC_DIR_NAME = "/public"
export const TEMPLATE_DIR_NAME = "/templates"

// server path configurations
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const APP_PATH = path.resolve(__dirname, "../..")
export const STORAGE_PATH = path.resolve(__dirname, `../..${STORAGE_DIR_NAME}`)
export const PUBLIC_FILE_STORAGE_PATH = path.resolve(__dirname, `../..${PUBLIC_FILE_STORAGE_DIR_NAME}`)
export const PRIVATE_FILE_STORAGE_PATH = path.resolve(__dirname, `../..${PRIVATE_FILE_STORAGE_DIR_NAME}`)
export const PUBLIC_PATH = path.resolve(__dirname, `../..${PUBLIC_DIR_NAME}`)
export const TEMPLATE_PATH = path.resolve(__dirname, `..${TEMPLATE_DIR_NAME}`)
