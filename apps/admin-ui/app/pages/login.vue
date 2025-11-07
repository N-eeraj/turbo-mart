<script setup lang="ts">
import {
  toTypedSchema,
} from "@vee-validate/zod"

import {
  loginSchema,
} from "@app/schemas/admin/auth"

const form = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

definePageMeta({
  auth: "guest",
  layout: "empty",
})
</script>

<template>
  <section class="flex justify-center items-center h-svh">
    <form 
      class="w-10/11 max-w-sm"
      @submit="onSubmit">
      <ShadcnCard>
        <ShadcnCardHeader>
          <ShadcnCardTitle>
            Create project
          </ShadcnCardTitle>
          <ShadcnCardDescription>
            Deploy your new project in one-click.
          </ShadcnCardDescription>
        </ShadcnCardHeader>
        <ShadcnCardContent>
          <ShadcnFormField v-slot="{ componentField }" name="email">
            <ShadcnFormItem>
              <ShadcnFormLabel>Username</ShadcnFormLabel>
              <ShadcnFormControl>
                <ShadcnInput type="text" placeholder="shadcn" v-bind="componentField" />
              </ShadcnFormControl>
              <ShadcnFormMessage />
            </ShadcnFormItem>
          </ShadcnFormField>
          <ShadcnFormField v-slot="{ componentField }" name="password">
            <ShadcnFormItem>
              <ShadcnFormLabel>Username</ShadcnFormLabel>
              <ShadcnFormControl>
                <ShadcnInput type="text" placeholder="shadcn" v-bind="componentField" />
              </ShadcnFormControl>
              <ShadcnFormMessage />
            </ShadcnFormItem>
          </ShadcnFormField>
        </ShadcnCardContent>
        <ShadcnCardFooter class="flex justify-between px-6 pb-6">
          <ShadcnButton>
            Deploy
          </ShadcnButton>
        </ShadcnCardFooter>
      </ShadcnCard>
    </form>
  </section>
</template>
