import path from "path"
import YAML from "yamljs"
import fs from "fs"
import swaggerUI from "swagger-ui-express"
import {
  type Request,
  type Response,
} from "express"

import {
  withAppPath,
} from "#utils/pathUtils"

const OPEN_API_DOCS = {
  openapi: "3.1.1",
  info: {
    title: process.env.npm_package_name as string,
    version: process.env.npm_package_version as string,
  },
  paths: {},
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      InternalServerError: {
        description: "Internal server error (unexpected error).",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: false,
                  description: "Indicates the request failed.",
                },
                message: {
                  type: "string",
                  example: "Oops! Something went wrong",
                  description: "Error message.",
                },
              },
            }
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
}

const docsPath = withAppPath("docs")

// Function to load and merge multiple YAML files from docs folder
function loadSwaggerDocs() {
  const files = fs.readdirSync(docsPath)

  // Loop through all YAML files in the docs folder
  files.forEach(file => {
    if (file.endsWith(".yml") || file.endsWith(".yaml")) {
      const filePath = path.join(docsPath, file)
      const yamlDoc = YAML.load(filePath)

      // Merge paths from each YAML file into the main OPEN_API_DOCS object
      if (yamlDoc.paths) {
        Object.assign(OPEN_API_DOCS.paths, yamlDoc.paths)
      }

      // Optionally merge components or other sections if needed
      if (yamlDoc.components) {
        if (!OPEN_API_DOCS.components) {
          OPEN_API_DOCS.components = yamlDoc.components
        } else {
          Object.assign(OPEN_API_DOCS.components, yamlDoc.components)
        }
      }
    }
  })

  return OPEN_API_DOCS
}

// Load the merged Swagger documentation from YAML files
const swaggerSpec = loadSwaggerDocs()

// Set up Swagger UI
export const swaggerUIServer = swaggerUI.serve
export const swaggerSetup = swaggerUI.setup(swaggerSpec)

// Endpoint to serve Swagger JSON directly
export function documentationJSON(_req: Request, res: Response) {
  res.setHeader("Content-Type", "application/json")
  res.send(swaggerSpec)
}

// {
//   "success": false,
//   "message": "Authorization header is required",
//   "errors": null
// }