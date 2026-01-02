import type {
  Breadcrumb
} from "~/types/breadcrumb"

export const ALL_ADMINS = [
  {
    text: "All Admins",
    url: "/admins",
    icon: "lucide:users",
  },
] satisfies Breadcrumb

export const CREATE_ADMIN = [
  ...ALL_ADMINS,
  {
    text: "Create Admin",
    url: "/admins/create",
    icon: "lucide:user-plus",
  },
] satisfies Breadcrumb

export const VIEW_ADMIN = [
  ...ALL_ADMINS,
  {
    text: "View Admin",
    url: "/admins/{id}",
    icon: "lucide:user",
  },
] satisfies Breadcrumb

export const EDIT_ADMIN = [
  ...VIEW_ADMIN,
  {
    text: "Edit Admin",
    url: "/admins/{id}/edit",
    icon: "lucide:user-pen",
  },
] satisfies Breadcrumb
