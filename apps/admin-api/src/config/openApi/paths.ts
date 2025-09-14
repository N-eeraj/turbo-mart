import generalPaths from "#docs/paths/general" with { type: "json" }
import authPaths from "#docs/paths/auth" with { type: "json" }
import profileUserPaths from "#docs/paths/profile/user" with { type: "json" }
import profileNotificationsPaths from "#docs/paths/profile/notifications" with { type: "json" }
import adminManagementPaths from "#docs/paths/superAdmin/adminManagement" with { type: "json" }

const profilePaths = {
  ...profileUserPaths,
  ...profileNotificationsPaths,
}

const paths = {
  ...generalPaths,
  ...authPaths,
  ...profilePaths,
  ...adminManagementPaths,
}

export default paths
