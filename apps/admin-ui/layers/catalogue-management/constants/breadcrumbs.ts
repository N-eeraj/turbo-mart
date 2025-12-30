// Category Breadcrumbs
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
    url: "/catalogue/categories/{id}",
    icon: "tabler:category",
  },
] satisfies Breadcrumb

export const EDIT_CATEGORY = [
  ...VIEW_CATEGORY,
  {
    text: "Edit Category",
    url: "/catalogue/categories/{id}/edit",
    icon: "lucide:pencil",
  },
] satisfies Breadcrumb

// Subcategory Breadcrumbs
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
    url: "/catalogue/subcategories/{id}",
    icon: "tabler:category",
  },
] satisfies Breadcrumb

export const EDIT_SUBCATEGORY = [
  ...VIEW_SUBCATEGORY,
  {
    text: "Edit Subcategory",
    url: "/catalogue/subcategories/{id}/edit",
    icon: "lucide:pencil",
  },
] satisfies Breadcrumb

// Brand Breadcrumbs
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
    url: "/catalogue/brands/{id}",
    icon: "mdi:tag-outline",
  },
] satisfies Breadcrumb

export const EDIT_BRAND = [
  ...VIEW_BRAND,
  {
    text: "Edit Brand",
    url: "/catalogue/brands/{id}/edit",
    icon: "mdi:tag-edit-outline",
  },
] satisfies Breadcrumb

// Product Breadcrumbs
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
    url: "/catalogue/products/{id}",
    icon: "lucide:box",
  },
] satisfies Breadcrumb

export const EDIT_PRODUCT = [
  ...VIEW_PRODUCT,
  {
    text: "Edit Product",
    url: "/catalogue/products/{id}/edit",
    icon: "lucide:pencil",
  },
] satisfies Breadcrumb
