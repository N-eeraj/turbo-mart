export default function useProductFormStepper() {
  const route = useRoute()
  const router = useRouter()

  const productId = computed(() => route.params?.id)

  const steps = computed(() => ([
    {
      indicator: 1,
      title: productId.value ? "Update" : "Create",
      description: productId.value ? "Update product details" : "Create a product",
    },
    {
      indicator: 2,
      title: "Attributes",
      description: "Update product attributes",
      disabled: !productId.value,
    },
    {
      indicator: 3,
      title: "Variants",
      description: "Update product SKUs",
      disabled: !productId.value,
    },
  ]))

  // sync stepper step with route query
  const step = useRouteQuery<number>("step", 1, {
    transform: (value: number) => {
      if (value < 1 || value > steps.value.length) {
        step.value = 1
        return 0
      }
      return value - 1
    },
  })

  function handleStepChange(stepValue: number | undefined) {
    if (stepValue === undefined) {
      step.value = 1
    } else {
      step.value = stepValue + 1
    }
  }

  function onSubmitProduct(data: any) {
    router.push({
      path: `/catalogue/products/${data.id}/edit`,
      query: {
        step: 2,
      },
    })
  }

  function onSubmitAttributes() {
    router.push({
      path: `/catalogue/products/${productId.value}/edit`,
      query: {
        step: 3,
      },
    })
  }

  return {
    step,
    steps,
    handleStepChange,
    onSubmitProduct,
    onSubmitAttributes,
  }
}
