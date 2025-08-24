import {
  drizzle,
} from "drizzle-orm/mysql2"

export const MYSQL_DB_URI = process.env.MYSQL_DB_URI

if (!MYSQL_DB_URI) {
  throw new Error("MySQL url is not defined.")
}

/**
 * Get drizzle db object.
 *
 * @returns A drizzle database instance
 */
export const db = drizzle(MYSQL_DB_URI)

export default db
