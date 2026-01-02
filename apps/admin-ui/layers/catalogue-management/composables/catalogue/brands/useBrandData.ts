export default function useBrandData() {
  const route = useRoute()
  const brandSlug = computed(() => route.params.slug)

  const resourceData = useResourceData({
    key: `brand-${brandSlug.value}`,
    endpoint: `/admin/catalogue/brands/slug/${brandSlug.value}`,
    onError: () => navigateTo("/catalogue/brands"),
  })

  return resourceData
}
