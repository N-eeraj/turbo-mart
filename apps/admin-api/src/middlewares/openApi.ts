import swaggerUI from "swagger-ui-express"
import {
  type Request,
  type Response,
} from "express"

import loadOpenApiDocs from "#src/config/openApi"

// Load the merged Swagger documentation from YAML files
const openApiSpec = loadOpenApiDocs()

// Set up Swagger UI
export const swaggerUIServer = swaggerUI.serve
export const swaggerSetup = swaggerUI.setup(openApiSpec)

// Endpoint to serve Swagger JSON directly
export function documentationJSON(_req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json")
  res.send(openApiSpec)
}
