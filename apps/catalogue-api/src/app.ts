import express from "express"

import {
  PORT,
  PUBLIC_PATH,
} from "#src/config/server"
import router from "#routes/index"

const app = express()
app.use(express.static(PUBLIC_PATH))
app.use(express.urlencoded({
  extended: true,
}))
app.use(router)

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})
