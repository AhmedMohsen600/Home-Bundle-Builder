/// <reference types="node" />

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const featureRoot = join(process.cwd(), 'src/features/bundle-builder')

describe('bundle builder feature architecture', () => {
  it('keeps rendering components, hooks, utilities, constants, and types split by concern', () => {
    const expectedFiles = [
      'BundleBuilder.tsx',
      'components/StepSection.tsx',
      'components/ProductCard.tsx',
      'components/VariantSelector.tsx',
      'components/QuantityStepper.tsx',
      'components/ReviewPanel.tsx',
      'components/ReviewLineItem.tsx',
      'components/ProductImage.tsx',
      'components/PriceBlock.tsx',
      'components/StepIconGraphic.tsx',
      'hooks/useBundleBuilder.ts',
      'hooks/useBundlePersistence.ts',
      'utils/bundleState.ts',
      'utils/formatters.ts',
      'utils/classNames.ts',
      'constants/bundleConstants.ts',
      'types/bundle.types.ts',
    ]

    expectedFiles.forEach((filePath) => {
      expect(existsSync(join(featureRoot, filePath)), filePath).toBe(true)
    })
  })

  it('keeps the feature entry component focused on layout and hook wiring', () => {
    const source = readFileSync(join(featureRoot, 'BundleBuilder.tsx'), 'utf8')

    expect(source).toContain('useBundleBuilder')
    expect(source).not.toMatch(
      /function (StepSection|ProductCard|VariantSelector|QuantityStepper|ReviewPanel|ReviewLineItem|ProductImage|PriceBlock|StepIconGraphic|formatPrice|readStoredState|hasStoredState)\b/,
    )
  })
})
