import type {
  Table,
  ColumnDef,
  TableOptionsWithReactiveData,
} from "@tanstack/vue-table"

export type Order = "asc" | "desc"

export interface FilterProps {
  hideSearch?: boolean
  hideSort?: boolean
}

export interface TableHeaderProps<TData> {
  table: Table<TData>
}

export interface TableBodyProps<TData, TValue> {
  loading?: boolean
  columns: Array<ColumnDef<TData, TValue>>
  table: Table<TData>
}

export interface DataTableProps<TData, TValue> extends
  FilterProps
  {
    columns: Array<ColumnDef<TData, TValue>>
    data: Array<TData>
    loading?: boolean
    totalPages?: number
    isInfinite?: boolean
    hasNext?: boolean
  }
