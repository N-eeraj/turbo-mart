import UnauthenticatedUser from "#docs/responses/unauthenticatedUser" with { type: "json" }
import UserNotFound from "#docs/responses/userNotFound" with { type: "json" }
import UnauthorizedSuperAdminUser from "#docs/responses/unauthorizedSuperAdminUser" with { type: "json" }
import UnauthorizedUser from "#docs/responses/unauthorizedUser" with { type: "json" }
import InternalServerError from "#docs/responses/internalServerError" with { type: "json" }
import InvalidNotificationIds from "#docs/responses/invalidNotificationIds" with { type: "json" }

// partial responses
import InvalidId from "#docs/responses/partials/invalidId" with { type: "json" }
import incorrectPassword from "#docs/responses/partials/incorrectPassword" with { type: "json" }
import notificationNotFound from "#docs/responses/partials/notificationNotFound" with { type: "json" }

/**
 * Generate an "invalid resource" response.
 * 
 * @param resourceName - Name of the resource.
 * 
 * @returns response for the invalid resource.
 */
function getInvalidResourceId(resourceName: string): typeof InvalidId {
  const invalidResourceId = {...InvalidId}
  invalidResourceId.content["application/json"].schema.properties.message.example = `Invalid ${resourceName} id`
  return invalidResourceId
}

// extended responses for invalid resource id
const InvalidAdminId = getInvalidResourceId("admin")
const InvalidCategoryId = getInvalidResourceId("category")

const InvalidIds = {
  InvalidAdminId,
  InvalidNotificationIds,
  InvalidCategoryId,
}

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

const {
  schema: UserNotFoundSchema,
} = UserNotFound.content["application/json"]

// extended response for notification not found from UserNotFoundSchema
const NotificationStatusNotFound = {
  ...UserNotFound,
  "description": "Not found error.",
  content: {
    "application/json": {
      schema: {
        type: UserNotFoundSchema.type,
        properties: {
          success: UserNotFoundSchema.properties.success,
          message: {
            oneOf: [
              UserNotFoundSchema.properties.message,
              notificationNotFound.message,
            ],
          },
        },
      },
      examples: {
        UserNotFound: {
          summary: "User Not Found",
          value: Object.fromEntries(
            Object.entries(UserNotFoundSchema.properties)
              .map(([ key, { example } ]) => ([key, example]))
          )
        },
        ...notificationNotFound.examples,
      },
    },
  },
}

const responses = {
  UnauthenticatedUser,
  UserNotFound,
  UnauthorizedSuperAdminUser,
  UnauthorizedUser,
  InternalServerError,
  IncorrectPassword,
  NotificationStatusNotFound,
  ...InvalidIds,
}

export default responses
