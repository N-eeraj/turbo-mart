<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  cn,
} from "@/lib/utils"
import Spinner from "~/components/ui/spinner/Spinner.vue";

interface Props{
  metadata?: AttributeObject<AttributeType.NUMBER>["metadata"]
}
const props = defineProps<Props>()

const metadataRows = computed(() => [
  {
    label: "Step Value",
    value: props.metadata?.step ? Intl.NumberFormat().format(props.metadata.step ?? undefined) : undefined,
  },
  {
    label: "Min Value",
    value: props.metadata?.min ? Intl.NumberFormat().format(props.metadata.min ?? undefined) : undefined,
  },
  {
    label: "Max Value",
    value: props.metadata?.max ? Intl.NumberFormat().format(props.metadata.max ?? undefined) : undefined,
  },
])

const {
  data: measurementTypes,
  status: measurementTypesStatus,
} = useLazyAsyncData(
  "measurement-types",
  () => useApi("/admin/catalogue/subcategories/attribute/measurement/types"),
  {
    transform: ({ data }) => data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ value, name, description }) => ({
        value,
        textValue: name,
        description,
      })),
    getCachedData: (key: string, nuxtApp: NuxtApp) => nuxtApp.payload.data[key]
  }
)
const isLoadingMeasurementTypes = computed(() => measurementTypesStatus.value === "pending")
const measurementType = computed(() => measurementTypes.value?.find(({ value }) => value === props.metadata?.measurementType))
</script>

<template>
  <div class="space-y-1.25">
    <div class="grid grid-cols-2 text-sm gap-x-1 gap-y-1">
      <span class="text-foreground/75">
        Measurement Type:
      </span>
      <Spinner v-if="isLoadingMeasurementTypes" />
      <span
        v-else
        class="font-medium">
        {{ measurementType.textValue }}
      </span>
      <p
        v-if="!isLoadingMeasurementTypes"
        class="col-span-2 inline-block -mt-0.75 mb-0.5 text-muted-foreground/75 text-xs leading-3">
        {{ measurementType.description }}
      </p>
      <div class="flex items-center gap-x-1">
        <span class="text-foreground/75">
          Allow Decimal:
        </span>
        <Icon
          :name="metadata?.allowDecimal ? 'lucide:check' : 'lucide:x'"
          :class="metadata?.allowDecimal ? 'text-green-500' : 'text-red-500'" />
      </div>
      <div class="flex items-center gap-x-1">
        <span class="text-foreground/75">
          Allow Negative:
        </span>
        <Icon
          :name="metadata?.allowNegative ? 'lucide:check' : 'lucide:x'"
          :class="metadata?.allowNegative ? 'text-green-500' : 'text-red-500'" />
      </div>

      <template
        v-for="({ label, value }, index) in metadataRows"
        :key="index">
        <span class="text-foreground/75">
          {{ label }}:
        </span>
        <span
          :class="cn(
            'font-medium',
            !value && 'text-foreground/75'
          )">
          {{ value ?? "-" }}
        </span>
      </template>
    </div>
  </div>
</template>
