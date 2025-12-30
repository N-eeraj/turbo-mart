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
  type ButtonVariants,
} from "@/components/ui/button"

interface Props {
  open: boolean
  variant?: ButtonVariants["variant"]
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
          <slot name="title">
            Confirmation Needed
          </slot>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot name="description" />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          class="cursor-pointer"
          @click="emit('cancel')">
          Cancel
        </AlertDialogCancel>
        <BaseButton
          :variant
          @click="emit('confirm')">
          Confirm
        </BaseButton>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
