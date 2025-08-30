import {
  drizzle,
} from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

import env from "@app/load-env"

if (!env.MYSQL_DB_URI) {
  throw new Error("MySQL url is not defined.")
}

/**
 * Get drizzle db object.
 * 
 * @returns A drizzle database instance
 */
// export const db = drizzle(env.MYSQL_DB_URI)
export const connection = await mysql.createConnection({
  uri: env.MYSQL_DB_URI
})
export const db = drizzle({
  client: connection,
})

export default db
