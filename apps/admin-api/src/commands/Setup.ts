import fs from "fs"

import User from "#mongodDb/models/Admin.ts"

import {
  withStoragePath,
} from "#utils/pathUtils"
import connectMongoDB from "#mongodDb/connect.ts"

const LOG_PATH = withStoragePath("logs")

/**
 * Setup class to perform initial application setup tasks,
 * such as ensuring required directories exist and
 * creating a super admin user if missing.
 */
export default class Setup {
  /**
   * Ensures that a directory exists by checking if it exists. 
   * If it does not, it creates the directory (and any necessary parent directories).
   *
   * @param directoryPath - The path of the directory to check/create.
   * @throws If an error occurs during directory creation (e.g., permission issues).
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
   * Ensures a super admin exists; creates one using env vars if missing.
   * Connects to MongoDB, checks by email, and inserts if not found.
   */
  private static createSuperAdmin() {
    connectMongoDB(async (connection) => {
      try {
        if (!connection.db) {
          throw new Error("Database not found")
        }
        const superAdmin = await User.findOne({
          email: process.env.SUPER_ADMIN_EMAIL,
        })
        if (superAdmin) {
          console.log("Super Admin already exists")
        } else {
          const superAdmin = new User({
            name: process.env.SUPER_ADMIN_NAME,
            email: process.env.SUPER_ADMIN_EMAIL,
            role: "SUPER_ADMIN",
            password: process.env.SUPER_ADMIN_PASSWORD,
          })
          await superAdmin.save()
          console.log("Created Super Admin!")
        }
      } catch (error) {
        console.error("Failed to create super admin", error)
      } finally {
        connection.close()
      }
    })
  }

  /**
   * Runs all setup tasks:
   * - Ensures required directories (e.g., logs) exist.
   * - Ensures a super admin user exists in the database.
   */
  static execute(..._args: Array<unknown>): void {
    this.ensureDirectory(LOG_PATH)
    this.createSuperAdmin()
  }
}
