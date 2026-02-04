export default function useProductFormStepper() {
  const route = useRoute()
  const router = useRouter()

  const productId = computed(() => route.params?.id)

  const steps = computed(() => ([
    {
      indicator: 1,
      title: productId.value ? "Update" : "Create",
      description: `${productId.value ? "Update" : "Create"} the product`,
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
      description: "Update product variants",
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

  async function onSubmitProduct(data: any) {
    router.replace({
      path: `/catalogue/products/${data.id}/edit`,
      query: {
        step: 2,
      },
    })
  }

  return {
    step,
    steps,
    handleStepChange,
    onSubmitProduct,
  }
}
