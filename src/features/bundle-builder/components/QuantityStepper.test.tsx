// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QuantityStepper } from './QuantityStepper'

describe('QuantityStepper', () => {
  it('renders the product-card stepper as separated square buttons', () => {
    render(<QuantityStepper label="Wyze Cam Floodlight v2 quantity" quantity={0} onChange={() => {}} />)

    expect(screen.getByTestId('quantity-stepper')).toHaveClass(
      'inline-flex',
      'gap-[10px]',
      'text-[28px]',
    )
    expect(
      screen.getByRole('button', {
        name: 'Decrease Wyze Cam Floodlight v2 quantity',
      }),
    ).toHaveClass(
      'size-[20px]',
      'rounded-[4px]',
      'bg-white',
      'border-2',
      'border-[#E6EBF0]',
    )
    expect(
      screen.getByRole('button', {
        name: 'Increase Wyze Cam Floodlight v2 quantity',
      }),
    ).toHaveClass('size-[20px]', 'rounded-[4px]', 'bg-[#f1f5f8]')
    expect(screen.getByText('0')).toHaveClass('text-base', 'font-medium')
  })
})
