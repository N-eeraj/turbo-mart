import type {
  Breadcrumb
} from "~/types/breadcrumb"

export const ALL_SUBCATEGORIES = [
  {
    text: "All Subcategories",
    url: "/catalogue/subcategories",
    icon: "carbon:categories",
  },
] satisfies Breadcrumb

export const CREATE_SUBCATEGORY = [
  ...ALL_SUBCATEGORIES,
  {
    text: "Create Subcategory",
    url: "/catalogue/subcategories/create",
    icon: "tabler:category-plus",
  },
] satisfies Breadcrumb

export const VIEW_SUBCATEGORY = [
  ...ALL_SUBCATEGORIES,
  {
    text: "View Subcategory",
    url: "/catalogue/subcategories/{slug}",
    icon: "tabler:category",
  },
] satisfies Breadcrumb

export const EDIT_SUBCATEGORY = [
  ...VIEW_SUBCATEGORY,
  {
    text: "Edit Subcategory",
    url: "/catalogue/subcategories/{slug}/edit",
    icon: "lucide:pencil",
  },
] satisfies Breadcrumb
