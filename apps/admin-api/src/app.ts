import express from "express"
import helmet from "helmet"

import connectMongoDB from "@app/database/mongoose/connect.ts"

import {
  APP_PORT,
  PUBLIC_PATH,
  PUBLIC_FILE_STORAGE_PATH,
} from "#src/config/server.ts"
import router from "#routes/index"
import rateLimiter from "#middlewares/rateLimiter"
import httpLogger from "#middlewares/logger"

const app = express()

app.use(express.static(PUBLIC_PATH))
app.use(express.static(PUBLIC_FILE_STORAGE_PATH))
app.use(express.urlencoded({
  extended: true,
}))
app.use(express.json())
app.use(helmet())

app.use(rateLimiter)
app.use(httpLogger)

app.use(router)

connectMongoDB(() => {
  app.listen(APP_PORT, () => {
    console.log(`Running on port: ${APP_PORT}`)
  })
})
