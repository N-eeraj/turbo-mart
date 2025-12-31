export default function useSubcategoryData() {
  const route = useRoute()
  const subcategoryId = computed(() => route.params.id)

  const {
    data,
    isLoading,
  } = useResourceData({
    key: `subcategory-${subcategoryId.value}`,
    endpoint: `/admin/catalogue/subcategories/${subcategoryId.value}`,
    onError: () => navigateTo("/catalogue/subcategories"),
  })

  return {
    subcategoryId,
    data,
    isLoading,
  }
}
