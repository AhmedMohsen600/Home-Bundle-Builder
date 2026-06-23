export type ProductCategory = 'cameras' | 'sensors' | 'accessories' | 'plan'

export type StepIcon =
  | 'camera'
  | 'shield'
  | 'sensor'
  | 'plus'
  | 'memory'
  | 'truck'

export interface ProductVariant {
  id: string
  label: string
  swatch: string
  image?: string
  price?: number
  compareAt?: number
}

export interface BundleProduct {
  id: string
  title: string
  description: string
  category: ProductCategory
  image: string
  price: number
  compareAt?: number
  badge?: string
  billing?: string
  learnMoreUrl?: string
  required?: boolean
  variants?: ProductVariant[]
}

export interface BundleStep {
  id: string
  eyebrow: string
  title: string
  icon: StepIcon
  nextLabel?: string
  category: ProductCategory
  products: BundleProduct[]
}

export interface InitialSelection {
  productId: string
  variantId?: string
  quantity: number
}

export interface BundleCatalog {
  steps: BundleStep[]
  initialSelection: InitialSelection[]
}

export interface BundleState {
  activeStepId: string
  activeVariantByProduct: Record<string, string>
  quantities: Record<string, number>
}

export interface ProductSelectionState {
  activeVariantId?: string
  quantity: number
  selected: boolean
}

export interface ReviewLine {
  key: string
  productId: string
  variantId?: string
  name: string
  category: ProductCategory
  image: string
  quantity: number
  price: number
  compareAt?: number
  billing?: string
  required?: boolean
}

export type ReviewGroups = Record<ProductCategory, ReviewLine[]>

export interface BundleTotals {
  compareAt: number
  price: number
  savings: number
}
