import express from "express"

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "#src/utils/response"

const apiRouter = express.Router()

apiRouter.get("/ping", (_req, res) => {
  sendSuccessResponse(res, {
    data: "pong",
    message: "Reached Server",
  })
})

apiRouter.use((_req, res) => {
  sendErrorResponse(res, {
    status: 404,
    errors: "Not Found",
    message: "Cannot find the URL",
  })
})

export default apiRouter
