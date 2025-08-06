import express from "express"

const apiRouter = express.Router()

apiRouter.get("/ping", (_req, res) => {
  res.send({
    success: true,
    message: "pong",
  })
})

apiRouter.use((_req, res) => {
  res.statusCode = 404
  res.send({
    error: "Not Found",
    success: false,
    message: "Cannot find the URL",
  })
})

export default apiRouter
