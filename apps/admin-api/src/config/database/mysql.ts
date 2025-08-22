import getDatabase from "#mysqlDb/db.ts"
import defineDrizzleConfig from "#mysqlDb/config.ts"

// mysql db uri configuration
export const MYSQL_DB_URI = process.env.MYSQL_DB_URI

if (!MYSQL_DB_URI) {
  throw new Error("MySQL url is not defined.")
}

export const db = getDatabase(MYSQL_DB_URI)

// Configure the drizzle kit config.
export default defineDrizzleConfig(MYSQL_DB_URI)
