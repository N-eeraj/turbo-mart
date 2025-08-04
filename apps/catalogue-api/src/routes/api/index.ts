import express from "express"

const apiRouter = express.Router()

apiRouter.use((_req, res) => {
  res.statusCode = 404
  res.send({
    error: "Not Found",
    message: "Cannot find the URL",
  })
})

export default apiRouter
