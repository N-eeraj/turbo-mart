import {
  drizzle,
} from "drizzle-orm/mysql2"

import env from "@app/load-env"

if (!env.MYSQL_DB_URI) {
  throw new Error("MySQL url is not defined.")
}

/**
 * Get drizzle db object.
 *
 * @returns A drizzle database instance
 */
export const db = drizzle(env.MYSQL_DB_URI)

export default db
