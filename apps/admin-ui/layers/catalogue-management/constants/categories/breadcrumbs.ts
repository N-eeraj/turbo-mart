import type {
  Breadcrumb
} from "~/types/breadcrumb"

export const ALL_CATEGORIES = [
  {
    text: "All Categories",
    url: "/catalogue/categories",
    icon: "carbon:categories",
  },
] satisfies Breadcrumb

export const CREATE_CATEGORY = [
  ...ALL_CATEGORIES,
  {
    text: "Create Category",
    url: "/catalogue/categories/create",
    icon: "tabler:category-plus",
  },
] satisfies Breadcrumb

export const VIEW_CATEGORY = [
  ...ALL_CATEGORIES,
  {
    text: "View Category",
    url: "/catalogue/categories/{slug}",
    icon: "tabler:category",
  },
] satisfies Breadcrumb

export const EDIT_CATEGORY = [
  ...VIEW_CATEGORY,
  {
    text: "Edit Category",
    url: "/catalogue/categories/{slug}/edit",
    icon: "lucide:pencil",
  },
] satisfies Breadcrumb
