export default function useCategoryData() {
  const route = useRoute()
  const categorySlug = computed(() => route.params.slug)

  const resourceData = useResourceData({
    key: `category-${categorySlug.value}`,
    endpoint: `/admin/catalogue/categories/slug/${categorySlug.value}`,
    onError: () => navigateTo("/catalogue/categories"),
  })

  return resourceData
}
