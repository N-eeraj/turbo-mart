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

interface Props {
  open: boolean
}
defineProps<Props>()

const emit = defineEmits([
  "confirm",
  "cancel",
])
</script>

<template>
  <AlertDialog :open>
    <AlertDialogContent class="p-4">
      <AlertDialogHeader>
        <AlertDialogTitle>
          Confirmation Needed
        </AlertDialogTitle>
        <AlertDialogDescription>
          You are about to delete this admin user.
          This action is irreversible, are you sure you want to continue?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          class="cursor-pointer"
          @click="emit('cancel')">
          Cancel
        </AlertDialogCancel>
        <BaseButton
          variant="destructive"
          @click="emit('confirm')">
          Confirm
        </BaseButton>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
