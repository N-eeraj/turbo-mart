import generalPaths from "#docs/paths/general" with { type: "json" }
import authPaths from "#docs/paths/auth" with { type: "json" }
import profileUserPaths from "#docs/paths/profile/user" with { type: "json" }
import profileNotificationsPaths from "#docs/paths/profile/notifications" with { type: "json" }
import superAdminPaths from "#docs/paths/superAdmin" with { type: "json" }
import categoriesPaths from "#docs/paths/admin/catalogue/categories" with { type: "json" }
import subcategoriesPaths from "#docs/paths/admin/catalogue/subcategories" with { type: "json" }

const profilePaths = {
  ...profileUserPaths,
  ...profileNotificationsPaths,
}

const cataloguePaths = {
  ...categoriesPaths,
  ...subcategoriesPaths,
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
