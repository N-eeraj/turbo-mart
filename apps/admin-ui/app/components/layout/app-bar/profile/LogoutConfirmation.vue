<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
} from "@/components/ui/dropdown-menu"

const open = defineModel({
  type: Boolean,
  required: true,
})

const {
  loading,
  handleLogout,
} = useLogout(open)
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to logout?
        </AlertDialogTitle>
        <AlertDialogDescription>
          You will be signed out of your account. Do you want to continue?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="cursor-pointer">
          Cancel
        </AlertDialogCancel>
        <BaseButton
          variant="destructive"
          :loading
          class="min-w-24"
          @click="handleLogout">
          Continue
        </BaseButton>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
