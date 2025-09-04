import generalPaths from "#docs/paths/general" with { type: "json" }
import authPaths from "#docs/paths/auth" with { type: "json" }
import profilePaths from "#docs/paths/profile" with { type: "json" }
import adminManagementPaths from "#docs/paths/superAdmin/adminManagement" with { type: "json" }

const paths = {
  ...generalPaths,
  ...authPaths,
  ...profilePaths,
  ...adminManagementPaths,
}

export default paths
