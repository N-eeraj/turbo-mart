import type {
  Breadcrumb
} from "~/types/breadcrumb"

export const ALL_PRODUCTS = [
  {
    text: "All Products",
    url: "/catalogue/products",
    icon: "system-uicons:cubes",
  },
] satisfies Breadcrumb

export const CREATE_PRODUCT = [
  ...ALL_PRODUCTS,
  {
    text: "Create Product",
    url: "/catalogue/products/create",
    icon: "lucide:plus",
  },
] satisfies Breadcrumb

export const VIEW_PRODUCT = [
  ...ALL_PRODUCTS,
  {
    text: "View Product",
    url: "/catalogue/products/{slug}",
    icon: "lucide:box",
  },
] satisfies Breadcrumb

export const EDIT_PRODUCT = [
  ...VIEW_PRODUCT,
  {
    text: "Edit Product",
    url: "/catalogue/products/{slug}/edit",
    icon: "lucide:pencil",
  },
] satisfies Breadcrumb
