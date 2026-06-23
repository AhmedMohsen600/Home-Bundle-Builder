// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PriceBlock } from './PriceBlock'

describe('PriceBlock', () => {
  it('uses the Figma product-card price colors and sizing by default', () => {
    render(<PriceBlock price={69.98} compareAt={89.98} />)

    expect(screen.getByText('$89.98')).toHaveClass(
      'text-base',
      'text-wyze-card-discount',
    )
    expect(screen.getByText('$69.98')).toHaveClass(
      'text-base',
      'text-wyze-card-price',
    )
  })
})
