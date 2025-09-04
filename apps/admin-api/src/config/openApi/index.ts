import paths from "#src/config/openApi/paths"
import schemas from "#src/config/openApi/schemas"
import responses from "#src/config/openApi/responses"

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
