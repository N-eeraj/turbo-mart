import express from "express"

import GeneralController from "#controllers/GeneralController"

const apiRouter = express.Router()

apiRouter.get("/ping", GeneralController.ping)
apiRouter.use(GeneralController.handleRouteNotFound)

export default apiRouter
