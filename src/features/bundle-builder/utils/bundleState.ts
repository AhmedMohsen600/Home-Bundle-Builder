import type { BundleCatalog, BundleState } from '../types/bundle.types'
import { createLineKey } from './bundleSelection'

export function createInitialBundleState(catalog: BundleCatalog): BundleState {
  const activeVariantByProduct = catalog.steps.reduce<Record<string, string>>(
    (variants, step) => {
      step.products.forEach((product) => {
        const firstVariant = product.variants?.[0]

        if (firstVariant) {
          variants[product.id] = firstVariant.id
        }
      })

      return variants
    },
    {},
  )

  const quantities = catalog.initialSelection.reduce<Record<string, number>>(
    (selected, item) => {
      if (item.quantity > 0) {
        selected[createLineKey(item.productId, item.variantId)] = item.quantity
      }

      return selected
    },
    {},
  )

  return {
    activeStepId: catalog.steps[0]?.id ?? '',
    activeVariantByProduct,
    quantities,
  }
}

export function setActiveStep(
  state: BundleState,
  activeStepId: string,
): BundleState {
  return {
    ...state,
    activeStepId,
  }
}

export function setActiveVariant(
  state: BundleState,
  productId: string,
  variantId: string,
): BundleState {
  return {
    ...state,
    activeVariantByProduct: {
      ...state.activeVariantByProduct,
      [productId]: variantId,
    },
  }
}

export function setLineQuantity(
  state: BundleState,
  productId: string,
  variantId: string | undefined,
  quantity: number,
): BundleState {
  const key = createLineKey(productId, variantId)
  const nextQuantities = { ...state.quantities }
  const nextQuantity = Math.max(0, Math.trunc(quantity))

  if (nextQuantity === 0) {
    delete nextQuantities[key]
  } else {
    nextQuantities[key] = nextQuantity
  }

  return {
    ...state,
    quantities: nextQuantities,
  }
}

export function serializeBundleState(state: BundleState): BundleState {
  return {
    activeStepId: state.activeStepId,
    activeVariantByProduct: { ...state.activeVariantByProduct },
    quantities: Object.fromEntries(
      Object.entries(state.quantities).filter(([, quantity]) => quantity > 0),
    ),
  }
}

export function hydrateBundleState(
  catalog: BundleCatalog,
  storedState: unknown,
): BundleState {
  const initialState = createInitialBundleState(catalog)

  if (!isBundleState(storedState)) {
    return initialState
  }

  const validStepIds = new Set(catalog.steps.map((step) => step.id))
  const validLineKeys = new Set<string>()
  const validVariantsByProduct = new Map<string, Set<string>>()

  catalog.steps.forEach((step) => {
    step.products.forEach((product) => {
      if (!product.variants?.length) {
        validLineKeys.add(product.id)
        return
      }

      const variantIds = new Set<string>()

      product.variants.forEach((variant) => {
        validLineKeys.add(createLineKey(product.id, variant.id))
        variantIds.add(variant.id)
      })

      validVariantsByProduct.set(product.id, variantIds)
    })
  })

  const activeVariantByProduct = { ...initialState.activeVariantByProduct }

  Object.entries(storedState.activeVariantByProduct).forEach(
    ([productId, variantId]) => {
      if (validVariantsByProduct.get(productId)?.has(variantId)) {
        activeVariantByProduct[productId] = variantId
      }
    },
  )

  const quantities = Object.fromEntries(
    Object.entries(storedState.quantities)
      .filter(([key, quantity]) => validLineKeys.has(key) && quantity > 0)
      .map(([key, quantity]) => [key, Math.trunc(quantity)]),
  )

  return {
    activeStepId: validStepIds.has(storedState.activeStepId)
      ? storedState.activeStepId
      : initialState.activeStepId,
    activeVariantByProduct,
    quantities,
  }
}

function isBundleState(value: unknown): value is BundleState {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<BundleState>

  return (
    typeof candidate.activeStepId === 'string' &&
    isStringRecord(candidate.activeVariantByProduct) &&
    isNumberRecord(candidate.quantities)
  )
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    !!value &&
    typeof value === 'object' &&
    Object.values(value).every((item) => typeof item === 'string')
  )
}

function isNumberRecord(value: unknown): value is Record<string, number> {
  return (
    !!value &&
    typeof value === 'object' &&
    Object.values(value).every((item) => typeof item === 'number')
  )
}
