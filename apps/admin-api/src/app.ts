import express from "express"
import helmet from "helmet"

import {
  PORT,
  PUBLIC_PATH,
} from "#src/config/server"
import connectMongoDB from "#src/config/database"
import router from "#routes/index"
import rateLimiter from "#middlewares/rateLimiter"
import httpLogger from "#middlewares/logger"

const app = express()

app.use(express.static(PUBLIC_PATH))
app.use(express.urlencoded({
  extended: true,
}))
app.use(express.json())
app.use(helmet())

app.use(rateLimiter)
app.use(httpLogger)

app.use(router)

connectMongoDB(() => {
  app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
  })
})
