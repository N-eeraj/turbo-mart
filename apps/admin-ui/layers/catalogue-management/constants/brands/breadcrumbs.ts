import type {
  Breadcrumb
} from "~/types/breadcrumb"

export const ALL_BRANDS = [
  {
    text: "All Brands",
    url: "/catalogue/brands",
    icon: "mdi:tag-multiple-outline",
  },
] satisfies Breadcrumb

export const CREATE_BRAND = [
  ...ALL_BRANDS,
  {
    text: "Create Brand",
    url: "/catalogue/brands/create",
    icon: "mdi:tag-plus-outline",
  },
] satisfies Breadcrumb

export const VIEW_BRAND = [
  ...ALL_BRANDS,
  {
    text: "View Brand",
    url: "/catalogue/brands/{slug}",
    icon: "mdi:tag-outline",
  },
] satisfies Breadcrumb

export const EDIT_BRAND = [
  ...VIEW_BRAND,
  {
    text: "Edit Brand",
    url: "/catalogue/brands/{slug}/edit",
    icon: "mdi:tag-edit-outline",
  },
] satisfies Breadcrumb
