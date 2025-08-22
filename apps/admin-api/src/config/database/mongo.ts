import connect from "@app/database/mongoose/connect.ts"

// mongo db uri configuration
export const MONGODB_URI = process.env.MONGODB_URI

/**
 * Establishes a connection to the database.
 *
 * @param callback - A function to be executed once the connection is successfully established.
 */
async function connectMongoDB(callback?: Parameters<typeof connect>[1]) {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined.")
    }
    connect(MONGODB_URI, callback)
  } catch (error) {
    throw error
  }
}

export default connectMongoDB
