export default function useSubcategoryData() {
  const route = useRoute()
  const subcategorySlug = computed(() => route.params.slug)

  const {
    data,
    isLoading,
  } = useResourceData({
    key: `subcategory-${subcategorySlug.value}`,
    endpoint: `/admin/catalogue/subcategories/slug/${subcategorySlug.value}`,
    onError: () => navigateTo("/catalogue/subcategories"),
  })

  return {
    subcategorySlug,
    data,
    isLoading,
  }
}
