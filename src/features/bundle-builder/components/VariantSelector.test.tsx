// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VariantSelector } from './VariantSelector'
import type { BundleProduct } from '../types/bundle.types'

const sampleProduct: BundleProduct = {
  id: 'cam-v4',
  title: 'Wyze Cam v4',
  description: 'Indoor/outdoor 2.5K camera.',
  category: 'cameras',
  image: '/cam.png',
  price: 27.99,
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
}

describe('VariantSelector', () => {
  it('uses the requested active and normal variant border colors', () => {
    render(
      <VariantSelector
        product={sampleProduct}
        activeVariantId="white"
        onSetVariant={() => {}}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'White for Wyze Cam v4' }),
    ).toHaveClass(
      'border-[hsla(170,88%,34%,1)]',
      'bg-[hsla(165,88%,53%,0.04)]',
    )
    expect(
      screen.getByRole('button', { name: 'Black for Wyze Cam v4' }),
    ).toHaveClass('border-[#CCCCCC]', 'bg-white')
  })
})
