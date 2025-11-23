<script setup lang="ts">
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const NOTIFICATION_TYPE = [
  {
    label: "All",
    value: undefined,
  },
  {
    label: "Unread",
    value: true,
  },
  {
    label: "Read",
    value: false,
  },
] as const

const route = useRoute()

const notificationIndex = ref(0)

const handleNotificationTypeChange = (value: string | number) => {
  console.log(NOTIFICATION_TYPE[Number(value)])
}

onMounted(() => {
  notificationIndex.value = Math.max(
    0,
    NOTIFICATION_TYPE
      .findIndex(({ label }) => label.toLocaleLowerCase() === route.query.type)
  )
})
</script>

<template>
  <h1 class="w-full text-xl md:text-2xl font-medium">
    Notifications
  </h1>

  <Tabs
    v-model="notificationIndex"
    class="max-md:mt-2"
    @update:model-value="handleNotificationTypeChange">
    <TabsList class="flex md:justify-end items-center w-full md:w-fit ml-auto">
      <TabsTrigger
        v-for="({ label }, index) in NOTIFICATION_TYPE"
        :value="index"
        :key="index"
        class="min-w-20 cursor-pointer">
        {{ label }}
      </TabsTrigger>
    </TabsList>
  </Tabs>

  <ul class="mt-2">
  </ul>
</template>
