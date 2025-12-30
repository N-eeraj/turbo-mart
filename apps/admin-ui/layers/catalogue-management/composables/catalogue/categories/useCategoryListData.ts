import {
  toast,
} from "vue-sonner"
import type {
  Order,
} from "~/types/dataTable"

const LIMIT = 10
const COLUMNS = [
  {
    id: "name",
    header: "Name",
  },
  {
    id: "slug",
    header: "Slug",
  },
  {
    id: "createdAt",
    header: "Created On",
  },
  {
    id: "updatedAt",
    header: "Last Updated",
  },
  {
    id: "id",
    header: "Actions",
  },
]

export default function useCategoryListData() {
  const page = useRouteQuery("page", 1)
  const search = useRouteQuery("search", "")
  const order = useRouteQuery<Order>("order", "asc")
  const hasNextPage = ref(true)

  const {
    data,
    status,
    error,
    refresh,
  } = useLazyAsyncData(
    "categories-list",
    () => useApi("/admin/catalogue/categories", {
      query: {
        skip: (page.value - 1) * LIMIT,
        limit: LIMIT + 1, // fetch one extra item to determine if a next page exists
        order: order.value,
        search: search.value,
      }
    }),
    {
      transform: ({ data }) => data,
      watch: [
        () => page.value,
        () => order.value,
      ],
    }
  )

  const categoriesData = computed(() => data.value?.slice(0, LIMIT)) // slice to page size; extra item indicates if more pages exist
  const isLoading = computed(() => status.value === "pending")

  watch(() => data.value, (data) => {
    if (!data) return
    hasNextPage.value = data.length > LIMIT
  })

  watch(() => error.value, (error) => {
    if (
      error?.cause
      && typeof error?.cause === "object" 
      && "message" in error?.cause
      && typeof error.cause.message === "string"
    ) {
      toast.error(error.cause.message)
    } else {
      toast.error("Oops! Something went wrong")
    }
    navigateTo("/")
  })

  watchDebounced(
    () => search.value,
    (toSearch, fromSearch) => {
      if (
        (
          !toSearch.trim().length
          || toSearch.trim() === fromSearch.trim()
        )
        && !(
          fromSearch.trim().length
          && !toSearch.trim().length
        )
      ) return
      page.value = 1
      refresh()
    },
    { debounce: 500},
  )

  const {
    showConfirmation: showDeleteConfirmation,
    confirm: confirmDelete,
    cancel: cancelDelete,
    onDelete,
  } = useCategoryDelete()

  const deletingIds = ref<Array<string>>([])

  const handleDelete = async (id: string) => {
    await onDelete(
      id,
      {
        onConfirm: () => deletingIds.value.push(id),
        onSuccess: () => refresh(),
      }
    )
    deletingIds.value = deletingIds.value.filter((categoryId) => categoryId !== id)
  }

  return {
    data: categoriesData,
    isLoading,
    page,
    hasNextPage,
    search,
    order,
    columns: COLUMNS,
    handleDelete,
    showDeleteConfirmation,
    deletingIds,
    confirmDelete,
    cancelDelete,
  }
}
