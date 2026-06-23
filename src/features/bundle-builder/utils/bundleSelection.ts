import type {
  BundleCatalog,
  BundleProduct,
  BundleState,
  ProductSelectionState,
} from '../types/bundle.types'

export function createLineKey(productId: string, variantId?: string) {
  return variantId ? `${productId}:${variantId}` : productId
}

export function getProductLineKey(
  product: BundleProduct,
  state: BundleState,
) {
  return createLineKey(product.id, state.activeVariantByProduct[product.id])
}

export function getProductQuantity(
  product: BundleProduct,
  state: BundleState,
) {
  return state.quantities[getProductLineKey(product, state)] ?? 0
}

export function getProductSelection(
  product: BundleProduct,
  state: BundleState,
): ProductSelectionState {
  const activeVariantId = state.activeVariantByProduct[product.id]
  const quantity = getProductQuantity(product, state)
  const selected =
    product.variants?.some(
      (variant) =>
        (state.quantities[createLineKey(product.id, variant.id)] ?? 0) > 0,
    ) ?? quantity > 0

  return {
    activeVariantId,
    quantity,
    selected,
  }
}

export function getStepSelectedCount(
  catalog: BundleCatalog,
  state: BundleState,
  stepId: string,
) {
  const step = catalog.steps.find((item) => item.id === stepId)

  if (!step) {
    return 0
  }

  return step.products.filter((product) => {
    if (!product.variants?.length) {
      return (state.quantities[product.id] ?? 0) > 0
    }

    return product.variants.some(
      (variant) =>
        (state.quantities[createLineKey(product.id, variant.id)] ?? 0) > 0,
    )
  }).length
}
