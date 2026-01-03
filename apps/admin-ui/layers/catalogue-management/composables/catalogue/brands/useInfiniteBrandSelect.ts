import {
  type BrandCreationData,
} from "@app/schemas/admin/catalogue/brand"
import {
  type SelectItemProps,
  type AcceptableValue,
} from "reka-ui"

interface BrandData extends BrandCreationData {
  id: string
}
export default function useInfiniteBrandSelect(initialBrand?: ComputedRef<BrandData | undefined>) {
  const {
    data,
    isLoading,
    page: brandsPage,
    hasNextPage,
    search,
  } = useBrandListData({
    persistQuery: false
  })

  const brands = ref<Array<SelectItemProps>>(
    initialBrand?.value
      ? [
        {
          value: initialBrand.value.id,
          textValue: initialBrand.value.name,
        }
      ]
      : []
  )

  watch(() => search.value, () => {
    brands.value = []
  })

  watch(() => data.value, () => {
    if (!data.value) return
    const brandsList = [
      ...brands.value,
      ...data.value
        .map(({ id, name }) => ({
          value: id,
          textValue: name,
        }))
    ]

    const seen = new Set()
    const uniqueBrands: Array<SelectItemProps> = []
    
    for (let i = brandsList.length - 1; i >= 0; i--) {
      const item = brandsList[i] as SelectItemProps<AcceptableValue>
      if (!seen.has(item?.value)) {
        seen.add(item?.value)
        uniqueBrands.push(item)
      }
    }
    
    uniqueBrands.reverse()
    brands.value = uniqueBrands
  })

  const loadMore = () => brandsPage.value = `${+brandsPage.value + 1}`

  return {
    brands,
    isLoading,
    hasNextPage,
    loadMore,
    search,
  }
}
