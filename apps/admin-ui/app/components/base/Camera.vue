<script setup lang="ts">
import Camera from "simple-vue-camera"

interface Props {
  resolution?: {
    width: number
    height: number
  }
}
const {
  resolution,
} = defineProps<Props>()

interface Emits {
  capture: [File]
  close: []
}
const emit = defineEmits<Emits>()

const camera = useTemplateRef<typeof Camera>("camera")

async function capture() {
  if (!camera.value) return
  const blob = await camera.value.snapshot(resolution, "image/png")
  const pngImage = new File(
    [blob],
    `${new Date().toISOString()}.png`,
    { type: "image/png" }
  )
  emit("capture", pngImage)
}
</script>

<template>
  <LazyClientOnly>
    <Teleport to="body">
      <div class="fixed top-0 left-0 flex justify-center items-center size-full bg-black z-50">
        <slot name="close">
          <BaseButton
            variant="ghost"
            class="absolute top-2 left-2 grid place-content-center size-10 rounded-full z-51"
            @click="emit('close')">
            <Icon
              name="lucide:x"
              :size="24" />
          </BaseButton>
        </slot>

        <Camera
          ref="camera"
          :resolution
          autoplay
          class="size-full" />

        <slot name="shutter">
          <BaseButton
            variant="secondary"
            class="absolute bottom-2 left-1/2 size-16 rounded-full -translate-x-1/2"
            @click="capture">
            <Icon
              name="lucide:camera"
              :size="32" />
          </BaseButton>
        </slot>
      </div>
    </Teleport>
  </LazyClientOnly>
</template>
