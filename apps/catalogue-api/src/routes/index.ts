import express from "express"
import path from "path"
import {
  PUBLIC_PATH,
} from "#src/config/server"

const router = express.Router()

router.get("/", (_req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, "html/index.html"))
})

router.use("/api", (_req, res) => {
  res.statusCode = 404
  res.send("404")
})

export default router