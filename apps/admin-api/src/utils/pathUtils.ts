import path from "path"
import {
  APP_PATH,
  STORAGE_PATH,
  PUBLIC_PATH,
} from "#src/config/server"

/**
 * Resolves the given relative path to an absolute path within the application directory.
 *
 * @param relativePath - The relative path to be joined with the application's root path.
 * @returns The resolved absolute path.
 */
export const withAppPath = (relativePath: string): string => {
  return path.join(APP_PATH, relativePath)
}

/**
 * Resolves the given relative path to an absolute path within the storage directory.
 *
 * @param relativePath - The relative path to be joined with the storage path.
 * @returns The resolved absolute path.
 */
export const withStoragePath = (relativePath: string): string => {
  return path.join(STORAGE_PATH, relativePath)
}

/**
 * Resolves the given relative path to an absolute path within the public directory.
 *
 * @param relativePath - The relative path to be joined with the public directory path.
 * @returns The resolved absolute path.
 */
export const withPublicPath = (relativePath: string): string => {
  return path.join(PUBLIC_PATH, relativePath)
}
