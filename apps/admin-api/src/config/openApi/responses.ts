import UnauthenticatedUser from "#docs/responses/unauthenticatedUser" with { type: "json" }
import UnauthorizedSuperAdminUser from "#docs/responses/unauthorizedSuperAdminUser" with { type: "json" }
import InternalServerError from "#docs/responses/internalServerError" with { type: "json" }

import incorrectPassword from "#docs/responses/incorrectPassword" with { type: "json" }

// extended response for password update from UnauthenticatedUser
const {
  schema: UnauthenticatedUserSchema,
  examples: UnauthenticatedUserExamples,
} = UnauthenticatedUser.content["application/json"]
const IncorrectPassword = {
  ...UnauthenticatedUser,
  content: {
    "application/json": {
      schema: {
        type: UnauthenticatedUserSchema.type,
        properties: {
          success: UnauthenticatedUserSchema.properties.success,
          message: {
            oneOf: [
              ...UnauthenticatedUserSchema.properties.message.oneOf,
              incorrectPassword.message,
            ],
          },
        },
      },
      examples: {
        ...UnauthenticatedUserExamples,
        ...incorrectPassword.examples,
      },
    },
  },
}

const responses = {
  UnauthenticatedUser,
  UnauthorizedSuperAdminUser,
  InternalServerError,
  IncorrectPassword,
}

export default responses
