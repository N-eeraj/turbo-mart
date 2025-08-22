import {
  drizzle,
} from "drizzle-orm/mysql2"

/**
 * Get drizzle db object.
 *
 * @param mysqlUri - The MySQL connection URI
 * @returns A drizzle database instance
 */
function getDatabase(mysqlUri: string) {
  return drizzle(mysqlUri)
}

export default getDatabase
