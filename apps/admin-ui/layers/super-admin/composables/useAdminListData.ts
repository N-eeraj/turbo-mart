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
    id: "email",
    header: "Email",
  },
  {
    id: "createdAt",
    header: "Since",
  },
  {
    id: "id",
    header: "Actions",
  },
]

export default function useAdminListData() {
  const page = ref(1)
  const search = ref("")
  const order = ref<Order>("asc")

  const {
    data,
    status,
    error,
    refresh,
  } = useLazyAsyncData(
    "admin-list",
    () => useApi("/super-admin/admin", {
      query: {
        skip: (page.value - 1) * LIMIT,
        limit: LIMIT,
        order: order.value,
        search: search.value,
      }
    }),
    {
      transform: ({ data }) => (data as Array<AdminDataObject>)
        .map(({ role, permissions, ...admin }) => admin),
      watch: [
        () => page.value,
        () => order.value,
      ],
    }
  )

  const isLoading = computed(() => status.value === "pending")

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
    { debounce: 500, maxWait: 1000 },
  )

  return {
    data,
    isLoading,
    page,
    search,
    order,
    columns: COLUMNS,
  }
}
