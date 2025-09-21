import fs from "fs"

const envFile = fs.readFileSync("../../.env", "utf-8")
const lines = envFile.replaceAll(" = ", "=").split("\n")

const env = lines.reduce((env, line) => {
    const [key, value] = line.split("=")
    if (key && value) {
      env[key as keyof typeof env] = value
    }
    return env
  }, {
    MYSQL_DB_URI: "",
    MONGODB_URI: "",
    MAIL_TRAP_TOKEN: "",
    EMAIL_SENDER_EMAIL: "",
    EMAIL_SENDER_NAME: "",
  })

export default env
