import express from "express"

import corsMiddleware from "#middlewares/cors"
import authRouter from "#routes/api/auth"
import profileRouter from "#routes/api/profile"
import superAdminRouter from "#routes/api/superAdmin/index"
import GeneralController from "#controllers/GeneralController"

/**
 * Root API router.
 * 
 * Mounts all domain-specific API routes.
 * Used in the base router (`src/routes/index.ts`) via `router.use("/api", apiRoutes)`.
 */
const apiRouter = express.Router()

// Enable CORS for all API routes
apiRouter.use(corsMiddleware)

apiRouter.use("/auth", authRouter)
apiRouter.use("/profile", profileRouter)
apiRouter.use("/super-admin", superAdminRouter)

apiRouter.get("/ping", GeneralController.ping)
apiRouter.use(GeneralController.handleRouteNotFound)

export default apiRouter
