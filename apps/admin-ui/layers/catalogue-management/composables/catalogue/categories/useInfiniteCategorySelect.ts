import {
  type CategoryCreationData,
} from "@app/schemas/admin/catalogue/category"
import {
  type SelectItemProps,
  type AcceptableValue,
} from "reka-ui"

interface SubcategoryCategory extends CategoryCreationData {
  id: string
}
export default function useInfiniteCategorySelect(initialCategory?: ComputedRef<SubcategoryCategory | undefined>) {
  const {
    data,
    isLoading,
    page: categoriesPage,
    hasNextPage,
    search,
  } = useCategoryListData({
    persistQuery: false
  })

  const categories = ref<Array<SelectItemProps>>(
    initialCategory?.value
      ? [
        {
          value: initialCategory.value.id,
          textValue: initialCategory.value.name,
        }
      ]
      : []
  )

  watch(() => search.value, () => {
    categories.value = []
  })

  watch(() => data.value, () => {
    if (!data.value) return
    const categoriesList = [
      ...categories.value,
      ...data.value
        .map(({ id, name }) => ({
          value: id,
          textValue: name,
        }))
    ]

    const seen = new Set()
    const uniqueCategories: Array<SelectItemProps> = []
    
    for (let i = categoriesList.length - 1; i >= 0; i--) {
      const item = categoriesList[i] as SelectItemProps<AcceptableValue>
      if (!seen.has(item?.value)) {
        seen.add(item?.value)
        uniqueCategories.push(item)
      }
    }
    
    uniqueCategories.reverse()
    categories.value = uniqueCategories
  })

  const loadMore = () => categoriesPage.value = `${+categoriesPage.value + 1}`

  return {
    categories,
    isLoading,
    hasNextPage,
    loadMore,
    search,
  }
}
