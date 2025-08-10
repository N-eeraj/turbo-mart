import express from "express"

import apiRoutes from "#routes/api/index"
import StaticController from "#controllers/StaticController"

/**
 * Root application router.
 *
 * Combines and mounts all API and web routes.
 * Used as the base router in `src/app.ts` via `app.use(router)`.
 */
const router = express.Router()

router.use("/api", apiRoutes)
router.get("/", StaticController.getHome)
router.use(StaticController.handlePageNotFound)

export default router
