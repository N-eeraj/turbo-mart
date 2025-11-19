<script setup lang="ts">
const {
  user,
  enableEdit,
  isInvalid,
  isSubmitting,
  toggleEdit,
  onSubmit,
} = useProfileUpdate()
</script>

<template>
  <form
    v-if="user"
    class="flex flex-col gap-y-4 w-5/6 max-w-xl mt-4"
    @submit="onSubmit">
    <FormFieldInput
      name="name"
      :value="user.name"
      label="Name"
      :readonly="!enableEdit"
      class="w-full" />
    <FormFieldInput
      name="email"
      :value="user.email"
      label="Email"
      :readonly="!enableEdit"
      class="w-full" />

    <Transition
      mode="out-in"
      enter-from-class="opacity-0"
      exit-to-class="opacity-0"
      enter-active-class="duration-500"
      exit-active-class="duration-500">
      <div
        v-if="enableEdit"
        class="flex flex-col md:flex-row-reverse gap-x-2 gap-y-3">
        <BaseButton
          :disabled="isInvalid"
          :loading="isSubmitting"
          class="flex items-center gap-x-2 md:max-w-fit">
          <span>
            Update
          </span>
          <Icon
            name="lucide:save"
            class="md:hidden!" />
        </BaseButton>
        <BaseButton
          type="button"
          variant="outline"
          :disabled="isSubmitting"
          class="flex items-center gap-x-2 md:max-w-fit"
          @click="toggleEdit">
          <span>
            Cancel
          </span>
          <Icon
            name="lucide:x"
            class="md:hidden!" />
        </BaseButton>
      </div>

      <BaseButton
        v-else
        variant="secondary"
        type="button"
        class="flex items-center gap-x-2 min-w-32 md:max-w-fit md:ml-auto"
        @click="toggleEdit">
        <span>
          Edit
        </span>
        <Icon
          name="lucide:pencil"
          class="md:hidden!" />
      </BaseButton>
    </Transition>
  </form>
</template>
