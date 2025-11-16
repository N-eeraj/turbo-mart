export default function useProfilePicture() {
  const userStore = useUserStore()
  const {
    user,
  } = storeToRefs(userStore)
  
  const userInitials = computed(() => user.value?.name.split(" ", 2).map(([i]) => i?.toUpperCase()).join(""))
  const profilePicture = computed(() => user.value?.profilePicture ?? "")

  const openProfilePictureView = ref(false)
  const toggleProfilePictureView = () => {
    openProfilePictureView.value = !openProfilePictureView.value
  }

  return {
    user,
    userInitials,
    profilePicture,
    openProfilePictureView,
    toggleProfilePictureView,
  }
}
