import generalPaths from "#docs/paths/general" with { type: "json" }
import authPaths from "#docs/paths/auth" with { type: "json" }
import profileUserPaths from "#docs/paths/profile/user" with { type: "json" }
import profileNotificationsPaths from "#docs/paths/profile/notifications" with { type: "json" }
import superAdminPaths from "#docs/paths/superAdmin" with { type: "json" }
import categoryPaths from "#docs/paths/admin/catalogue/category" with { type: "json" }
import subCategoryPaths from "#docs/paths/admin/catalogue/subCategory" with { type: "json" }

const profilePaths = {
  ...profileUserPaths,
  ...profileNotificationsPaths,
}

const cataloguePaths = {
  ...categoryPaths,
  ...subCategoryPaths,
}

const adminPaths = {
  ...cataloguePaths,
}

const paths = {
  ...generalPaths,
  ...authPaths,
  ...profilePaths,
  ...superAdminPaths,
  ...adminPaths,
}

export default paths
