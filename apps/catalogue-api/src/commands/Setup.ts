import fs from "fs"

import {
  withStoragePath,
} from "#utils/pathUtils"

const LOG_PATH = withStoragePath("logs")

/**
 * Class to handle setup tasks, such as ensuring the necessary directories exist.
 */
export default class Setup {
  /**
   * Ensures that a directory exists by checking if it exists. 
   * If it does not, it creates the directory (and any necessary parent directories).
   *
   * @param {string} directoryPath - The path of the directory to check/create.
   * @throws {Error} If an error occurs during directory creation (e.g., permission issues).
   */
  private static ensureDirectory(directoryPath: string): void {
    try {
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true })
        console.log(`Directory created: ${directoryPath}`)
      } else {
        console.log(`Directory already exists: ${directoryPath}`)
      }
    } catch (error) {
      console.error(`Error creating directory ${directoryPath}:`, error)
    }
  }

  /**
   * Executes the setup by ensuring the required directories exist.
   * In this case, it ensures the `LOG_PATH` directory exists.
   */
  static execute(): void {
    this.ensureDirectory(LOG_PATH)
  }
}
