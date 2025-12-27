export const ALL_ADMINS = [
  {
    text: "All Admins",
    url: "/admin",
    icon: "lucide:users",
  },
] satisfies Breadcrumb

export const CREATE_ADMIN = [
  ...ALL_ADMINS,
  {
    text: "Create Admin",
    url: "/admin/create",
    icon: "lucide:user-plus",
  },
] satisfies Breadcrumb

export const VIEW_ADMIN = [
  ...ALL_ADMINS,
  {
    text: "View Admin",
    url: "/admin/{id}",
    icon: "lucide:user",
  },
] satisfies Breadcrumb

export const EDIT_ADMIN = [
  ...VIEW_ADMIN,
  {
    text: "Edit Admin",
    url: "/admin/{id}/edit",
    icon: "lucide:user-pen",
  },
] satisfies Breadcrumb
