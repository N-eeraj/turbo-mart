import {
  toast,
} from "vue-sonner"
import type {
  Order,
} from "~/types/dataTable"

interface Options {
  key: string
  endpoint: string
  query?: Ref<Record<string, unknown>> | ComputedRef<Record<string, unknown>>
  onError: Function
}

const LIMIT = 10

export default function useResourceListData<T = unknown>({ key, endpoint, onError, query }: Options) {
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
    key,
    () => useApi(endpoint, {
      query: {
        skip: (page.value - 1) * LIMIT,
        limit: LIMIT + 1, // fetch one extra item to determine if a next page exists
        order: order.value,
        search: search.value,
        ...query?.value,
      }
    }),
    {
      transform: ({ data }) => data as Array<T>,
      watch: [
        () => page.value,
        () => order.value,
      ],
    }
  )

  const resourceData = computed(() => data.value?.slice(0, LIMIT)) // slice to page size; extra item indicates if more pages exist
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
    onError?.()
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

  return {
    data: resourceData,
    isLoading,
    page,
    hasNextPage,
    search,
    order,
    refresh,
  }
}
