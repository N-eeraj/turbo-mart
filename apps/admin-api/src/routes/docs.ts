import express from "express"

import {
  documentationJSON,
  swaggerSetup,
  swaggerUIServer,
} from "#middlewares/openApi"

/**
 * Documentation router.
 * 
 * Serves the API documentation routes, including the raw JSON spec
 * and the interactive Swagger UI.
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
