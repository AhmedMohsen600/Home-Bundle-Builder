import { bundleCategories } from '../constants/bundleConstants'
import type {
  BundleCatalog,
  BundleProduct,
  BundleState,
  BundleTotals,
  ReviewGroups,
  ReviewLine,
} from '../types/bundle.types'
import { createLineKey } from './bundleSelection'

export function getReviewGroups(
  catalog: BundleCatalog,
  state: BundleState,
): ReviewGroups {
  const groups = createEmptyGroups()

  catalog.steps.forEach((step) => {
    step.products.forEach((product) => {
      if (!product.variants?.length) {
        const quantity = state.quantities[product.id] ?? 0

        if (quantity > 0) {
          groups[product.category].push(createReviewLine(product, quantity))
        }

        return
      }

      product.variants.forEach((variant) => {
        const key = createLineKey(product.id, variant.id)
        const quantity = state.quantities[key] ?? 0

        if (quantity > 0) {
          groups[product.category].push(
            createReviewLine(product, quantity, variant.id),
          )
        }
      })
    })
  })

  return groups
}

export function getTotals(groups: ReviewGroups): BundleTotals {
  const lines = Object.values(groups).flat()
  const price = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  )
  const compareAt = lines.reduce(
    (sum, line) => sum + (line.compareAt ?? line.price) * line.quantity,
    0,
  )

  return {
    compareAt: toMoney(compareAt),
    price: toMoney(price),
    savings: toMoney(compareAt - price),
  }
}

function createEmptyGroups(): ReviewGroups {
  return bundleCategories.reduce<ReviewGroups>(
    (groups, category) => {
      groups[category] = []
      return groups
    },
    {
      cameras: [],
      sensors: [],
      accessories: [],
      plan: [],
    },
  )
}

function createReviewLine(
  product: BundleProduct,
  quantity: number,
  variantId?: string,
): ReviewLine {
  const variant = product.variants?.find((item) => item.id === variantId)
  const key = createLineKey(product.id, variantId)

  return {
    key,
    productId: product.id,
    variantId,
    name: variant ? `${product.title} - ${variant.label}` : product.title,
    category: product.category,
    image: variant?.image ?? product.image,
    quantity,
    price: variant?.price ?? product.price,
    compareAt: variant?.compareAt ?? product.compareAt,
    billing: product.billing,
    required: product.required,
  }
}

function toMoney(value: number) {
  return Math.round(value * 100) / 100
}
