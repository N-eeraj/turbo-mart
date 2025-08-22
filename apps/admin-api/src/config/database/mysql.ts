import defineDrizzleConfig from "#mysqlDb/config.ts"

// mysql db uri configuration
export const MYSQL_DB_URI = process.env.MYSQL_DB_URI

if (!MYSQL_DB_URI) {
  throw new Error("MySQL url is not defined.")
}

export default defineDrizzleConfig(MYSQL_DB_URI)
