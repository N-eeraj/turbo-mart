import mysql from "mysql2/promise"
import { drizzle } from "drizzle-orm/mysql2"

// mysql db uri configuration
export const MYSQL_DB_URI = process.env.MYSQL_DB_URI

// confirm env variable exists
if (!MYSQL_DB_URI) {
  throw new Error("MYSQL_DB_URI environment variable is not set")
}

const pool = mysql.createPool(MYSQL_DB_URI)
const db = drizzle(pool)

export default db
