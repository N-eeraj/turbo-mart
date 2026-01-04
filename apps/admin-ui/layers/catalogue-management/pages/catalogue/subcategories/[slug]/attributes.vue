<script setup lang="ts">
const {
  attributeTypes,
  isLoadingAttributeTypes,
  isSubmitting,
  createFields,
  createPush,
  createRemove,
  onSubmit,
  values,
  errors,
} = useAttributesMapping()
</script>

<template>
  <section class="flex flex-col gap-y-2 md:gap-y-3">
    <h1 class="text-lg md:text-xl">
      Attributes
    </h1>

    <form
      class="flex flex-col gap-y-3"
      @submit="onSubmit">
      <ul class="grid md:grid-cols-2 gap-4">
        <li
          v-for="(field, index) in createFields"
          :key="field.key"
          class="grid md:grid-cols-3 items-center gap-x-4 gap-y-2 py-5 px-3 bg-secondary/20 border rounded">
          <FormFieldInput
            :name="`create[${index}].name`"
            placeholder="Attribute Name" />
          <FormFieldSelect
            :name="`create[${index}].type`"
            :options="attributeTypes"
            placeholder="Attribute Type"
            :loading="isLoadingAttributeTypes" />
          <FormFieldCheckbox
            :name="`create[${index}].required`"
            label="Is a required attribute"
            class="py-2 md:order-2" />
          <FormFieldCheckbox
            :name="`create[${index}].variant`"
            label="Is a variant attribute"
            class="py-2 md:order-2" />
          <BaseButton
            variant="destructive"
            size="icon-sm"
            type="button"
            class="ml-auto order-3 md:order-1"
            @click="createRemove(index)">
            <Icon name="lucide:trash-2" />
          </BaseButton>

          <!-- Metadata -->
          <div class="order-2 md:order-3 md:col-span-3 pt-2 border-t border-t-foreground/10">
            <span class="text-xs text-foreground/75">
              Metadata
            </span>
          </div>
        </li>
      </ul>

      <BaseButton
        variant="outline"
        type="button"
        class="ml-auto px-3 text-primary/75 hover:text-primary"
        @click="createPush({ type: null })">
        <span class="text-xs">
          Add Attribute
        </span>
        <Icon
          name="lucide:plus"
          :size="14" />
      </BaseButton>

      <span
        v-if="errors.root"
        class="text-xs text-destructive">
        {{ errors.root }}
      </span>

      <BaseButton class="mt-3 md:mt-4 ml-auto">
        Submit
      </BaseButton>
    </form>
  </section>
</template>
