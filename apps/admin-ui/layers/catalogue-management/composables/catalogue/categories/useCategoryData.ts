export default function useCategoryData() {
  const route = useRoute()
  const categoryId = computed(() => route.params.id)

  const {
    data,
    isLoading,
  } = useResourceData({
    key: `category-${categoryId.value}`,
    endpoint: `/admin/catalogue/categories/${categoryId.value}`,
    onError: () => navigateTo("/catalogue/categories"),
  })

  return {
    categoryId,
    data,
    isLoading,
  }
}
