import express from "express"

import {
  documentationJSON,
  swaggerSetup,
  swaggerUIServer,
} from "#docs/middleware.ts"

/**
 * Documentation router.
 * 
 * Serves the API documentation routes, including the raw JSON spec
 * and the interactive Swagger UI.
 * 
 * Used in the base router (`src/routes/index.ts`) via `router.use(docRoutes)`.
 */
const docRouter = express.Router()

/**
 * @route GET /docs/file.json
 * 
 * Returns the OpenAPI specification in JSON format.
 */
docRouter.get("/docs.json", documentationJSON)

/**
 * @route GET /docs
 * 
 * Serves the Swagger UI documentation page.
 */
docRouter.use("/docs", swaggerUIServer, swaggerSetup)

export default docRouter
