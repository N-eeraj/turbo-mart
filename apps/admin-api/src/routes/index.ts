import express from "express"

import {
  ENVIRONMENT,
} from "@app/load-env"

import apiRoutes from "#src/routes/api.ts"
import docRoutes from "#docs/route.ts"
import StaticController from "#controllers/StaticController"
import {
  ENVIRONMENT as ENVIRONMENT_VARIABLE,
} from "#src/config/server.ts"

/**
 * Root application router.
 * 
 * Combines and mounts all API, docs and web routes.
 * Used as the base router in `src/app.ts` via `app.use(router)`.
 */
const router = express.Router()

router.use("/api", apiRoutes)

ENVIRONMENT_VARIABLE === ENVIRONMENT.DEV && router.use(docRoutes)

router.get("/", StaticController.getHome)
router.use(StaticController.handlePageNotFound)

export default router
