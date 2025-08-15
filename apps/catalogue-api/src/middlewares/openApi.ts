import swaggerJSDoc, {
  type Options
} from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import {
  type Request,
  type Response,
} from "express"

const swaggerSpecOptions: Options = {
  definition: {
    openapi: "3.1.1",
    info: {
      title: process.env.npm_package_name as string,
      version: process.env.npm_package_version as string,
    },
  },
  apis: [
    "./docs/**/*.ts",
  ],
}

export const swaggerSpec = swaggerJSDoc(swaggerSpecOptions)

export const swaggerUIServer = swaggerUI.serve
export const swaggerSetup = swaggerUI.setup(swaggerSpec)

export function documentationJSON(_req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json")
  res.send(swaggerSpec)
}
