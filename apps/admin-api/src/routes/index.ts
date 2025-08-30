import express from "express"

import apiRoutes from "#routes/api/index"
import docRoutes from "#routes/docs"
import StaticController from "#controllers/StaticController"

/**
 * Root application router.
 * 
 * Combines and mounts all API, docs and web routes.
 * Used as the base router in `src/app.ts` via `app.use(router)`.
 */
const router = express.Router()

router.use("/api", apiRoutes)
router.use(docRoutes)
router.get("/", StaticController.getHome)
router.use(StaticController.handlePageNotFound)

export default router
