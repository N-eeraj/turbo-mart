import express from "express"

import apiRoutes from "#routes/api/index"
import {
  withPublicPath,
} from "#utils/pathUtils"
import corsMiddleware from "#middlewares/cors"

const router = express.Router()

router.use("/api", corsMiddleware, apiRoutes)

router.get("/", (_req, res) => {
  res.sendFile(withPublicPath("html/index.html"))
})

router.use((_req, res) => {
  res.statusCode = 404
  res.sendFile(withPublicPath("html/404.html"))
})

export default router
