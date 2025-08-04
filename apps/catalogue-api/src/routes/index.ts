import path from "path"
import express from "express"

import {
  PUBLIC_PATH,
} from "#src/config/server"
import apiRoutes from "#routes/api/index"

const router = express.Router()

router.use("/api", apiRoutes)

router.get("/", (_req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, "html/index.html"))
})

router.use((_req, res) => {
  res.statusCode = 404
  res.sendFile(path.join(PUBLIC_PATH, "html/404.html"))
})

export default router