import mongoose from "mongoose"

// mongo db uri configuration
export const MONGODB_URI = process.env.MONGODB_URI

/**
 * Establishes a connection to the mongo database.
 *
 * @param callback - An optional function to be executed once the connection is successfully established.
 */
async function connect(callback?: (connection: mongoose.Connection) => unknown) {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined.")
    }
    console.log("Trying to connect to database")
    const { connection } = await mongoose.connect(MONGODB_URI)
    console.log(`Database Connected: ${connection.host}`)
    await callback?.(connection)
  } catch (error) {
    console.error("Failed to connect to database\n", error)
    throw error
  }
}

export default connect
