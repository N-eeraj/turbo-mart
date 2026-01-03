import {
  type SubcategoryCreationData,
} from "@app/schemas/admin/catalogue/subcategory"
import {
  type SelectItemProps,
  type AcceptableValue,
} from "reka-ui"

interface SubcategoryData extends SubcategoryCreationData {
  id: string
}
export default function useInfiniteSubcategorySelect(initialSubcategory?: ComputedRef<SubcategoryData | undefined>) {
  const {
    data,
    isLoading,
    page: subcategoriesPage,
    hasNextPage,
    search,
  } = useSubcategoryListData({
    persistQuery: false
  })

  const subcategories = ref<Array<SelectItemProps>>(
    initialSubcategory?.value
      ? [
        {
          value: initialSubcategory.value.id,
          textValue: initialSubcategory.value.name,
        }
      ]
      : []
  )

  watch(() => search.value, () => {
    subcategories.value = []
  })

  watch(() => data.value, () => {
    if (!data.value) return
    const subcategoriesList = [
      ...subcategories.value,
      ...data.value
        .map(({ id, name }) => ({
          value: id,
          textValue: name,
        }))
    ]

    const seen = new Set()
    const uniqueCategories: Array<SelectItemProps> = []
    
    for (let i = subcategoriesList.length - 1; i >= 0; i--) {
      const item = subcategoriesList[i] as SelectItemProps<AcceptableValue>
      if (!seen.has(item?.value)) {
        seen.add(item?.value)
        uniqueCategories.push(item)
      }
    }
    
    uniqueCategories.reverse()
    subcategories.value = uniqueCategories
  })

  const loadMore = () => subcategoriesPage.value = `${+subcategoriesPage.value + 1}`

  return {
    subcategories,
    isLoading,
    hasNextPage,
    loadMore,
    search,
  }
}
