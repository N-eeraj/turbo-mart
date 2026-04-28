<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  FormLabel,
} from "@/components/ui/form"

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.COLOR>
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})

const attributeType = computed(() => props.isVariant ? "variant" : "property")
const {
  value: colorValue,
} = useField<string>(`${props.fieldName}.value`)
</script>

<template>
  <div class="flex items-start gap-x-4">
    <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
      {{ attributeType }} Color
    </FormLabel>

    <ColorPicker
      v-model="colorValue"
      with-alpha
      with-eye-dropper
      with-hex-input
      with-rgb-input
      with-colors-history
      v-slot="{ show }">
      <button
        type="button"
        class="color-picker size-8 outline outline-muted-foreground rounded-md cursor-pointer"
        @click="show" />
    </ColorPicker>
  </div>
</template>

<style scoped>
.color-picker {
  background-color: v-bind(colorValue);
}
</style>
