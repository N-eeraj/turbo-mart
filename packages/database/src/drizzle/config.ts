import {
  defineConfig,
} from "drizzle-kit"

// relative path from app root to drizzle database package
const DRIZZLE_PATH = "../../packages/database/src/drizzle"

/**
 * Creates a Drizzle Kit configuration object for a MySQL database.
 *
 * @param url - The MySQL connection URI.
 * @returns A Drizzle Kit configuration object used for schema generation and migrations.
 */
function defineDrizzleConfig(url: string) {
  if (!url) {
    throw new Error("MySQL url is not defined.")
  }

  return defineConfig({
    out: `${DRIZZLE_PATH}/migrations`,
    schema: `${DRIZZLE_PATH}/schemas/*`,
    dialect: "mysql",
    dbCredentials: {
      url,
    },
  })
}

export default defineDrizzleConfig
