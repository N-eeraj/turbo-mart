import type { LocationQueryValueRaw } from "vue-router"

export default function useRefQuery<T extends LocationQueryValueRaw>(
  key: string,
  enabled: boolean,
  defaultValue: T,
) {
  const local = ref<T>(defaultValue)
  const query = useRouteQuery<T>(key, defaultValue)

  return computed<T>({
    get() {
      return enabled ? query.value : local.value
    },
    set(value) {
      if (enabled) {
        query.value = value
      } else {
        local.value = value
      }
    },
  })
}
