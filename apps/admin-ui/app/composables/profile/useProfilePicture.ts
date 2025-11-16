import {
  toast,
} from "vue-sonner"

import {
  PROFILE_PICTURE,
} from "@app/schemas/adminConstants/validationMessages"

const ALLOWED_MIMES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
] as const
const ALLOWED_EXTENSIONS = ALLOWED_MIMES
  .map((mime) => mime.replace("image/", ""))
const MAX_FILE_SIZE = 1_048_576

export default function useProfilePicture() {
  const userStore = useUserStore()
  const {
    user,
  } = storeToRefs(userStore)
  const {
    setProfilePicture,
  } = userStore
  
  const userInitials = computed(() => user.value?.name.split(" ", 2).map(([i]) => i?.toUpperCase()).join(""))
  const profilePicture = computed(() => user.value?.profilePicture ?? "")

  const openProfilePictureView = ref(false)
  const toggleProfilePictureView = () => {
    openProfilePictureView.value = !openProfilePictureView.value
  }

  const handleFileSelection = (event: Event) => {
    const {
      files,
    } = event.target as HTMLInputElement
    if (!files?.length || !files[0]) return
    const selectedFile = files[0]
    const extension = selectedFile.name.split(".")[1]
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      toast.error("Invalid file type", {
        description: PROFILE_PICTURE.valid,
        position: "top-right",
        classes: {
          description: "text-muted-foreground!",
        },
      })
      return
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: PROFILE_PICTURE.maxSize,
        position: "top-right",
        classes: {
          description: "text-muted-foreground!",
        },
      })
      return
    }
    updateProfilePicture(selectedFile)
  }

  const updateProfilePicture = async (file: File) => {
    // optimistic update and rollback
    const rollbackSrc = user.value?.profilePicture
    const tempSrc = URL.createObjectURL(file)
    setProfilePicture(tempSrc)

    try {
      const body = new FormData()
      body.append("profilePicture", file)
      const {
        data,
      } = await useApi("/profile/picture", {
        method: "PUT",
        body,
      })
      // use new URL from response
      if (typeof data === "string") {
        setProfilePicture(data)
      }
    } catch (error: unknown) {
      setProfilePicture(rollbackSrc) // rollback on failure
      const {
        status,
        message,
        errors,
      } = error as ApiError
      if (
        status === 422
        && errors
        && "profilePicture" in errors
        && Array.isArray(errors.profilePicture)
      ) {
        toast.error(errors.profilePicture[0] ?? message, {
          position: "top-right",
          richColors: true,
        })
      } else {
        toast.error(message, {
          position: "top-right",
        })
      }
    }
  }

  const openProfilePictureRemove = ref(false)
  const toggleProfilePictureRemove = () => {
    openProfilePictureRemove.value = !openProfilePictureRemove.value
  }

  return {
    ALLOWED_MIMES,
    user,
    userInitials,
    profilePicture,
    openProfilePictureView,
    openProfilePictureRemove,
    toggleProfilePictureView,
    handleFileSelection,
    toggleProfilePictureRemove,
  }
}
