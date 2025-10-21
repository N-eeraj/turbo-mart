import paths from "#docs/config/paths.ts"
import schemas from "#docs/config/schemas.ts"
import responses from "#docs/config/responses.ts"

const OPEN_API_CONFIG = {
  openapi: "3.1.1",
  info: {
    title: process.env.npm_package_name as string,
    version: process.env.npm_package_version as string,
  },
  paths,
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
