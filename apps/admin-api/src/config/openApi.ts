import general from "#docs/general" with { type: "json" }
import auth from "#docs/auth" with { type: "json" }

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
  paths: {
    ...auth.paths,
    ...general.paths,
  },
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

export default OPEN_API_CONFIG
