import type { ProductCategory, StepIcon } from '../types/bundle.types'

export const BUNDLE_STORAGE_KEY = 'home-bundle-builder:configuration'
export const SAVED_SYSTEM_MESSAGE =
  'Saved. Your system is ready when you return.'
export const CHECKOUT_READY_MESSAGE = 'Your checkout is ready for the prototype.'

export const bundleCategories: ProductCategory[] = [
  'cameras',
  'sensors',
  'accessories',
  'plan',
]

export const groupLabels: Record<ProductCategory, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
}

export const categoryFallbackIcons: Record<ProductCategory, StepIcon> = {
  cameras: 'camera',
  sensors: 'sensor',
  accessories: 'memory',
  plan: 'shield',
}
