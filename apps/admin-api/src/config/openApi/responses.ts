import UnauthenticatedUser from "#docs/responses/unauthenticatedUser" with { type: "json" }
import UnauthorizedSuperAdminUser from "#docs/responses/unauthorizedSuperAdminUser" with { type: "json" }
import InternalServerError from "#docs/responses/internalServerError" with { type: "json" }

const responses = {
  UnauthenticatedUser,
  UnauthorizedSuperAdminUser,
  InternalServerError,
}

export default responses
