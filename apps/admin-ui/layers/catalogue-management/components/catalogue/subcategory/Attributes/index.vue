<script setup lang="ts">
interface Props {
  slug: string
}
const props = defineProps<Props>()
</script>

<template>
  <section>
    <div class="flex items-baseline gap-x-1">
      <h2 class="text-lg md:text-xl">
        Attributes
      </h2>
      <NuxtLink :to="`/catalogue/subcategories/${slug}/attributes`">
        <BaseButton
          variant="ghost"
          size="icon-sm">
          <Icon name="lucide-edit" />
        </BaseButton>
      </NuxtLink>
    </div>
  </section>
</template>
