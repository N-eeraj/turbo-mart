<script setup lang="ts">

const loginForm = useTemplateRef("login-form")
const showForgotPassword = ref(false)

function openForgotPassword() {
  showForgotPassword.value = true
}

definePageMeta({
  auth: "guest",
  layout: "empty",
})
</script>

<template>
  <section class="flex justify-center items-center h-svh">
    <AuthLoginForm
      ref="login-form"
      @forgot-password="openForgotPassword" />

    <AuthForgotPassword
      v-model="showForgotPassword"
      :email="loginForm?.controlledValues.email" />
  </section>
</template>
