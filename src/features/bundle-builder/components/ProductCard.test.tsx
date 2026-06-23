// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductCard } from './ProductCard'
import type {
  BundleProduct,
  ProductSelectionState,
} from '../types/bundle.types'

const sampleProduct: BundleProduct = {
  id: 'cam-v4',
  title: 'Wyze Cam v4',
  description: 'Indoor/outdoor 2.5K camera with vivid color night vision.',
  category: 'cameras',
  image: '/cam.png',
  price: 27.99,
}

const selectedState: ProductSelectionState = {
  quantity: 1,
  selected: true,
}

describe('ProductCard', () => {
  it('uses the requested description color and font size', () => {
    render(
      <ProductCard
        product={sampleProduct}
        selection={selectedState}
        onSetVariant={() => {}}
        onSetQuantity={() => {}}
      />,
    )

    expect(screen.getByText(sampleProduct.description)).toHaveClass(
      'text-[12px]',
      'text-[#1F1F1FBF]',
    )
  })
})
