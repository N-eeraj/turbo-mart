import express from "express"

import apiRoutes from "#routes/api/index"
import StaticController from "#controllers/StaticController"
import corsMiddleware from "#middlewares/cors"

const router = express.Router()

router.use("/api", corsMiddleware, apiRoutes)
router.get("/", StaticController.getHome)
router.use(StaticController.handlePageNotFound)

export default router
