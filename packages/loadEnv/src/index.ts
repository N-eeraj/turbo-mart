import fs from "fs"

const envFile = fs.readFileSync("../../.env", "utf-8")
const lines = envFile.replaceAll(" = ", "=").split("\n")

const env = lines.reduce((env, line) => {
    const [key, value] = line.split("=")
    if (key && value) {
      env[key] = value
    }
    return env
  }, {
    MYSQL_DB_URI: null,
    MONGODB_URI: null,
  })

export default env
