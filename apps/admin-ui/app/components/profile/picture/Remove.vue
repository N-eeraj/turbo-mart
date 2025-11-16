<script setup lang="ts">
import {
  toast,
} from "vue-sonner"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import {
  VisuallyHidden,
} from "reka-ui"
import {
  buttonVariants,
} from "@/components/ui/button"
import {
  cn,
} from "@/lib/utils"

const open = defineModel({
  type: Boolean,
  required: true,
})

const userStore = useUserStore()
const {
  user,
} = storeToRefs(userStore)
const {
  setProfilePicture,
} = userStore

async function handleRemove() {
  // optimistic update
  const tempSrc = user.value?.profilePicture
  setProfilePicture()

  try {
    await useApi("/profile/picture", {
      method: "DELETE",
    })
  } catch (error: unknown) {
    const {
      message,
    } = error as ApiError
    toast.error(message)
    setProfilePicture(tempSrc) // rollback on failure
  }
}
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader class="text-sm text-start">
        <p>
          Are you sure you want to remove your profile picture?
        </p>
        <!-- hidden to suppress aria standard warnings  -->
        <VisuallyHidden>
          <AlertDialogTitle />
          <AlertDialogDescription />
        </VisuallyHidden>
      </AlertDialogHeader>
      <AlertDialogFooter class="flex-row justify-end items-baseline">
        <AlertDialogCancel class="cursor-pointer">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          :class="cn(buttonVariants({ variant: 'destructive' }), 'cursor-pointer')"
          @click="handleRemove">
          Remove
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
