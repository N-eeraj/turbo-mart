<script setup lang="ts">
import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  subcategoryAttributeUpdateSchema,
} from "@app/schemas/admin/catalogue/subcategory"

const {
  handleSubmit,
  isSubmitting,
  isFieldValid,
  setErrors,
} = useForm({
  validationSchema: toTypedSchema(
    subcategoryAttributeUpdateSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
  ),
  initialValues: {
    create: [],
    update: [],
    delete: [],
  },
})

const {
  data: attributeTypes,
  status: loadingAttributeTypes,
} = useLazyAsyncData(
  "attribute-types",
  () => useApi(`/admin/catalogue/subcategories/attribute-types`),
  {
    transform: ({ data }) => data
    .map(({ value, name }) => ({
      value,
      textValue: name,
    })),
  }
)
const isLoadingAttributeTypes = computed(() => loadingAttributeTypes.value === "pending")

const onSubmit = handleSubmit(async (body) => {
  try {
    console.log(body)
  } catch (error: unknown) {
    const {
      status,
      message,
      errors,
    } = error as ApiError
    if (status === 422 || status === 409) {
      setErrors(errors as Record<string, Array<string>>)
    } else if (message) {
      toast.error(message, {
        richColors: true,
      })
    }
  }
})
const { fields, push, remove } = useFieldArray("create")
</script>

<template>
  <section class="flex flex-col gap-y-2 md:gap-y-3">
    <h1 class="text-lg md:text-xl">
      Attributes
    </h1>

    <form
      class="flex flex-col gap-y-3"
      @submit="onSubmit">
      <ul class="space-y-4">
        <li
          v-for="(field, index) in fields"
          :key="field.key"
          class="flex items-center gap-x-2">
          <FormFieldSelect
            :name="`create[${index}].type`"
            :options="attributeTypes"
            placeholder="Attribute Type"
            :loading="isLoadingAttributeTypes" />
          <BaseButton
            variant="destructive"
            size="icon-sm"
            type="button"
            class="ml-auto"
            @click="remove(index)">
            <Icon name="lucide:trash-2" />
          </BaseButton>
        </li>
      </ul>

      <BaseButton
        variant="outline"
        type="button"
        class="ml-auto px-3 text-primary/75 hover:text-primary"
        @click="push({ type: null })">
        <span class="text-xs">
          Add Attribute
        </span>
        <Icon
          name="lucide:plus"
          :size="14" />
      </BaseButton>

      <BaseButton class="mt-3 md:mt-4 ml-auto">
        Submit
      </BaseButton>
    </form>
  </section>
</template>
