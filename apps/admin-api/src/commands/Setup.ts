import fs from "fs"

import AdminUser, {
  Roles,
} from "@app/database/mongoose/models/Admin/User.ts"
import connectMongoDB from "@app/database/mongoose/connect.ts"

import {
  PRIVATE_FILE_STORAGE_PATH,
  PUBLIC_FILE_STORAGE_PATH,
} from "#src/config/server"
import {
  withStoragePath,
} from "#utils/pathUtils"

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
   * 
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
  private static async createSuperAdmin() {
    await connectMongoDB(async (connection) => {
      try {
        if (!connection.db) {
          throw new Error("Database not found")
        }
        const superAdmin = await AdminUser.findOne({
          email: process.env.SUPER_ADMIN_EMAIL,
        })
        if (superAdmin) {
          console.log("Super Admin already exists")
        } else {
          const superAdmin = new AdminUser({
            name: process.env.SUPER_ADMIN_NAME,
            email: process.env.SUPER_ADMIN_EMAIL,
            role: Roles.SUPER_ADMIN,
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
  static async execute(..._args: Array<unknown>): Promise<void> {
    this.ensureDirectory(LOG_PATH)
    this.ensureDirectory(PUBLIC_FILE_STORAGE_PATH)
    this.ensureDirectory(PRIVATE_FILE_STORAGE_PATH)
    await this.createSuperAdmin()
    process.exit(0)
  }
}
