import express from "express"
import helmet from "helmet"

import {
  PORT,
  PUBLIC_PATH,
} from "#src/config/server"
import router from "#routes/index"
import logger from "#middlewares/logger"
import rateLimiter from "#middlewares/rateLimiter"

const app = express()

app.use(express.static(PUBLIC_PATH))
app.use(express.urlencoded({
  extended: true,
}))
app.use(helmet())

app.use(rateLimiter)
app.use(logger)
app.use(router)


app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})
