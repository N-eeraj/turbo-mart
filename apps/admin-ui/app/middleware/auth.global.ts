export default defineNuxtRouteMiddleware((to, _from) => {
  const userStore = useUserStore()
  const {
    isLoggedIn,
  } = storeToRefs(userStore)

  switch (to.meta.auth) {
    case "all":
      break
    case "guest":
      if (isLoggedIn.value) {
        return navigateTo("/")
      }
      break
    case "user":
    default:
      if (to.matched.length && !isLoggedIn.value) {
        return navigateTo(`/login?to=${to.fullPath}`)
      }
      break
  }
})
