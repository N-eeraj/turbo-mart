import mongoose from "mongoose"

import env from "@app/load-env"

/**
 * Establishes a connection to the mongo database.
 * 
 * @param callback - An optional function to be executed once the connection is successfully established.
 */
async function connect(callback?: (connection: mongoose.Connection) => unknown) {
  try {
    if (!env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined.")
    }
    console.log("Trying to connect to database")
    const { connection } = await mongoose.connect(env.MONGODB_URI)
    console.log(`Database Connected: ${connection.host}`)
    await callback?.(connection)
  } catch (error) {
    console.error("Failed to connect to database\n", error)
    throw error
  }
}

export default connect
