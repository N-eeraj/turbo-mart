import express from "express"

import corsMiddleware from "#middlewares/cors"
import authRouter from "#src/modules/auth/route.ts"
import profileRouter from "#src/modules/profile/route.ts"
import superAdminRouter from "#src/modules/superAdmin/route.ts"
import adminRouter from "#src/modules/admin/route.ts"
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
apiRouter.use("/admin", adminRouter)

apiRouter.get("/ping", GeneralController.ping)
apiRouter.use(GeneralController.handleRouteNotFound)

export default apiRouter
