import { describe, expect, it } from 'vitest'
import type { BundleCatalog } from '../types/bundle.types'
import { getReviewGroups, getTotals } from './bundleCalculations'
import { getStepSelectedCount } from './bundleSelection'
import {
  createInitialBundleState,
  serializeBundleState,
  setActiveVariant,
  setLineQuantity,
} from './bundleState'

const sampleCatalog: BundleCatalog = {
  steps: [
    {
      id: 'cameras',
      title: 'Choose your cameras',
      eyebrow: 'STEP 1 OF 4',
      icon: 'camera',
      nextLabel: 'Choose your plan',
      category: 'cameras',
      products: [
        {
          id: 'cam-v4',
          title: 'Wyze Cam v4',
          description: 'Indoor/outdoor 2.5K camera.',
          category: 'cameras',
          image: '/cam.png',
          price: 27.99,
          compareAt: 35.98,
          variants: [
            {
              id: 'white',
              label: 'White',
              swatch: '#ffffff',
              image: '/cam-white.png',
            },
            {
              id: 'black',
              label: 'Black',
              swatch: '#111111',
              image: '/cam-black.png',
            },
          ],
        },
        {
          id: 'doorbell',
          title: 'Wyze Duo Cam Doorbell',
          description: 'Dual-view doorbell camera.',
          category: 'cameras',
          image: '/doorbell.png',
          price: 69.98,
        },
      ],
    },
    {
      id: 'plan',
      title: 'Choose your plan',
      eyebrow: 'STEP 2 OF 4',
      icon: 'shield',
      nextLabel: 'Choose your sensors',
      category: 'plan',
      products: [
        {
          id: 'cam-unlimited',
          title: 'Cam Unlimited',
          description: 'Cloud recordings and smart alerts.',
          category: 'plan',
          image: '/plan.png',
          price: 9.99,
          compareAt: 12.99,
          billing: '/mo',
        },
      ],
    },
  ],
  initialSelection: [
    { productId: 'cam-v4', variantId: 'white', quantity: 1 },
    { productId: 'cam-v4', variantId: 'black', quantity: 2 },
    { productId: 'cam-unlimited', quantity: 1 },
  ],
}

describe('bundle state utilities', () => {
  it('tracks quantities separately for each active variant', () => {
    const state = createInitialBundleState(sampleCatalog)

    const withBlueActive = setActiveVariant(state, 'cam-v4', 'black')
    const updated = setLineQuantity(withBlueActive, 'cam-v4', 'black', 3)

    expect(updated.quantities['cam-v4:white']).toBe(1)
    expect(updated.quantities['cam-v4:black']).toBe(3)
    expect(updated.activeVariantByProduct['cam-v4']).toBe('black')
  })

  it('keeps review lines split by selected variants', () => {
    const state = createInitialBundleState(sampleCatalog)
    const groups = getReviewGroups(sampleCatalog, state)

    expect(groups.cameras.map((line) => line.name)).toEqual([
      'Wyze Cam v4 - White',
      'Wyze Cam v4 - Black',
    ])
    expect(groups.cameras.map((line) => line.quantity)).toEqual([1, 2])
  })

  it('counts distinct selected products in the active step', () => {
    const state = createInitialBundleState(sampleCatalog)

    expect(getStepSelectedCount(sampleCatalog, state, 'cameras')).toBe(1)

    const withDoorbell = setLineQuantity(state, 'doorbell', undefined, 1)

    expect(getStepSelectedCount(sampleCatalog, withDoorbell, 'cameras')).toBe(2)
  })

  it('calculates totals from selected review lines', () => {
    const state = createInitialBundleState(sampleCatalog)
    const totals = getTotals(getReviewGroups(sampleCatalog, state))

    expect(totals.compareAt).toBe(120.93)
    expect(totals.price).toBe(93.96)
    expect(totals.savings).toBe(26.97)
  })

  it('serializes only shopper-editable configuration', () => {
    const state = createInitialBundleState(sampleCatalog)
    const serialized = serializeBundleState(state)

    expect(serialized).toEqual({
      activeStepId: 'cameras',
      activeVariantByProduct: {
        'cam-v4': 'white',
      },
      quantities: {
        'cam-unlimited': 1,
        'cam-v4:black': 2,
        'cam-v4:white': 1,
      },
    })
  })
})
