import {
  defineConfig,
} from "drizzle-kit"

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
    out: "./drizzle",
    schema: "./schemas/index.ts",
    dialect: "mysql",
    dbCredentials: {
      url,
    },
  })
}

export default defineDrizzleConfig
