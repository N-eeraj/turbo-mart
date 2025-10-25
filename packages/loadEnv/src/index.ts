import fs from "fs"

const envFile = fs.readFileSync("../../.env", "utf-8")
const lines = envFile.replaceAll(" = ", "=").split("\n")

export enum ENVIRONMENT {
  PROD = "PROD",
  DEV = "DEV",
}

const ENVIRONMENT_KEY = "ENVIRONMENT" as const

const envVariables = {
  ADMIN_PORT: "",
  ADMIN_API_URL: "",
  ADMIN_UI_URL: "",
  ENVIRONMENT: ENVIRONMENT.DEV,
  MYSQL_DB_URI: "",
  MONGODB_URI: "",
  MAIL_TRAP_TOKEN: "",
  EMAIL_SENDER_EMAIL: "",
  EMAIL_SENDER_NAME: "",
}

const env = lines.reduce((env, line) => {
  const [key, value] = line.split("=")
  if (key && value) {
    if (key === ENVIRONMENT_KEY) {
      switch (value.toUpperCase()) {
        case ENVIRONMENT.PROD:
          env.ENVIRONMENT = ENVIRONMENT.PROD
          break
        case ENVIRONMENT.DEV:
          env.ENVIRONMENT = ENVIRONMENT.DEV
          break
        default:
          env.ENVIRONMENT = ENVIRONMENT.DEV
      }
    } else {
      env[key as keyof Omit<typeof env, typeof ENVIRONMENT_KEY>] = value
    }
  }
  return env
}, envVariables)

export default env
