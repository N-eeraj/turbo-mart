<template>
  <h1 class="text-3xl md:text-5xl text-center">
    Oops!
  </h1>
  <div class="text-center">
    <h2 class="text-lg md:text-xl">
      Looks like your URL is invalid.
    </h2>
    <p class="text-sm opacity-75">
      Please try to reset password again.
    </p>
  </div>

  <NuxtLink to="/login">
    <BaseButton>
      Back Home
    </BaseButton>
  </NuxtLink>
</template>
