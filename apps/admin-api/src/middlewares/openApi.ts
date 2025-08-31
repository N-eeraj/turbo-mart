import swaggerUI from "swagger-ui-express"
import {
  type Request,
  type Response,
} from "express"

import OPEN_API_CONFIG from "#src/config/openApi"

// Set up Swagger UI
export const swaggerUIServer = swaggerUI.serve
export const swaggerSetup = swaggerUI.setup(OPEN_API_CONFIG)

// Endpoint to serve Swagger JSON directly
export function documentationJSON(_req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json")
  res.send(OPEN_API_CONFIG)
}
