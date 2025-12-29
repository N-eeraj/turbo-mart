export type Order = "asc" | "desc"

export interface FilterProps {
  hideSearch?: boolean
  hideSort?: boolean
}

export interface DataTableProps extends FilterProps {
  data: Array<unknown>
  loading?: boolean
}
