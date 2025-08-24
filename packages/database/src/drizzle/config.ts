import {
  defineConfig,
} from "drizzle-kit"

const MYSQL_DB_URI = process.env.MYSQL_DB_URI

if (!MYSQL_DB_URI) {
  throw new Error("MySQL url is not defined.")
}

export default defineConfig({
  out: "./packages/database/src/drizzle/migrations",
  schema: "./packages/database/src/drizzle/schemas/*",
  dialect: "mysql",
  dbCredentials: {
    url: MYSQL_DB_URI,
  },
})
