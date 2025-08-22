import mongoose from "mongoose"

/**
 * Establishes a connection to the database.
 *
 * @param mongodbUri - The MongoDB connection URI
 * @param callback - An optional function to be executed once the connection is successfully established.
 */
async function connect(mongodbUri: string, callback?: (connection: mongoose.Connection) => unknown) {
  try {
    if (!mongodbUri) {
      throw new Error("mongodbUri is not defined.")
    }
    console.log("Trying to connect to database")
    const { connection } = await mongoose.connect(mongodbUri)
    console.log(`Database Connected: ${connection.host}`)
    await callback?.(connection)
  } catch (error) {
    console.error("Failed to connect to database\n", error)
    throw error
  }
}

export default connect
