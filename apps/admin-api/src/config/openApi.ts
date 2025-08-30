import path from "path"
import YAML from "yamljs"
import fs from "fs"
import {
  withAppPath,
} from "#utils/pathUtils"

import {
  loginJSONSchema,
} from "#schemas/auth"

const schemas = {
  LoginSchema: loginJSONSchema,
}

const responses = {
  UnauthorizedUser: {
    description: "Unauthorized User",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
              description: "Indicates the request failed."
            },
            message: {
              oneOf: [
                {
                  type: "string",
                  example: "Missing authentication token",
                  description: "Error message: Missing authentication token."
                },
                {
                  type: "string",
                  example: "Invalid authentication token",
                  description: "Error message: Invalid authentication token."
                }
              ]
            }
          }
        },
        examples: {
          MissingAuthToken: {
            summary: "Missing Authentication Token",
            value: {
              success: false,
              message: "Missing authentication token"
            }
          },
          InvalidAuthToken: {
            summary: "Invalid Authentication Token",
            value: {
              success: false,
              message: "Invalid authentication token"
            }
          }
        }
      }
    }
  },
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
}

const OPEN_API_CONFIG = {
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
    schemas,
    responses,
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
}

const docsPath = withAppPath("docs")

// Function to load and merge multiple YAML files from docs folder
function loadOpenApiDocs() {
  const files = fs.readdirSync(docsPath)

  // Loop through all YAML files in the docs folder
  files.forEach(file => {
    if (file.endsWith(".yml") || file.endsWith(".yaml")) {
      const filePath = path.join(docsPath, file)
      const yamlDoc = YAML.load(filePath)

      // Merge paths from each YAML file into the main OPEN_API_CONFIG object
      if (yamlDoc.paths) {
        Object.assign(OPEN_API_CONFIG.paths, yamlDoc.paths)
      }

      // Optionally merge components or other sections if needed
      if (yamlDoc.components) {
        if (!OPEN_API_CONFIG.components) {
          OPEN_API_CONFIG.components = yamlDoc.components
        } else {
          Object.assign(OPEN_API_CONFIG.components, yamlDoc.components)
        }
      }
    }
  })

  return OPEN_API_CONFIG
}

export default loadOpenApiDocs
