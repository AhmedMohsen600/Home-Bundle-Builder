// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import type { ReviewLine } from '../types/bundle.types'
import { ReviewLineItem } from './ReviewLineItem'

const planLine: ReviewLine = {
  key: 'cam-unlimited',
  productId: 'cam-unlimited',
  name: 'Cam Unlimited',
  category: 'plan',
  image: '/plan.png',
  quantity: 1,
  price: 9.99,
  compareAt: 12.99,
  billing: '/mo',
}

const variantLine: ReviewLine = {
  key: 'cam-v4:black',
  productId: 'cam-v4',
  variantId: 'black',
  name: 'Wyze Cam v4 - Black',
  category: 'cameras',
  image: '/cam-black.png',
  quantity: 1,
  price: 27.99,
  compareAt: 35.98,
}

describe('ReviewLineItem', () => {
  afterEach(() => {
    cleanup()
  })

  it('reserves separate review columns for normal quantity controls and price', () => {
    render(<ReviewLineItem line={planLine} onSetQuantity={() => {}} />)

    const row = screen.getByText('Cam Unlimited').parentElement?.parentElement

    expect(row).toHaveClass(
      'sm:grid-cols-[38px_minmax(0,1fr)_118px_78px]',
    )
    expect(
      screen.getByTestId('review-quantity-cam-unlimited-stepper'),
    ).toHaveClass('inline-flex', 'gap-[10px]', 'text-[28px]')
  })

  it('renders the provided Wyze shield SVG for the plan line', () => {
    render(<ReviewLineItem line={planLine} onSetQuantity={() => {}} />)

    const icon = screen.getByTestId('review-plan-shield-icon')

    expect(icon).toHaveAttribute('width', '20')
    expect(icon).toHaveAttribute('height', '24')
    expect(icon.querySelector('path[fill="#E7EFFD"]')).toBeInTheDocument()
    expect(icon.querySelector('path[stroke="#0046C7"]')).toBeInTheDocument()
  })

  it('uses the Figma review price color and typography', () => {
    render(<ReviewLineItem line={planLine} onSetQuantity={() => {}} />)

    expect(screen.getByText('$12.99')).toHaveClass(
      'text-[14px]',
      'font-bold',
      'leading-4',
      'tracking-[0.005em]',
      'text-wyze-discount',
    )
    expect(screen.getByText('$9.99')).toHaveClass(
      'text-[14px]',
      'font-semibold',
      'leading-4',
      'tracking-[0.005em]',
      'text-wyze-price',
    )
    expect(screen.getByText('/mo')).toHaveClass(
      'text-[14px]',
      'font-semibold',
      'leading-4',
      'tracking-[0.005em]',
      'text-wyze-price',
    )
  })

  it('shows variant labels visibly so selected colors remain distinguishable', () => {
    render(<ReviewLineItem line={variantLine} onSetQuantity={() => {}} />)

    expect(screen.getByText('Wyze Cam v4 - Black')).not.toHaveClass('sr-only')
  })

  it('lets required lines decrement back to one after being increased', () => {
    render(
      <ReviewLineItem
        line={{
          ...planLine,
          quantity: 2,
          required: true,
        }}
        onSetQuantity={() => {}}
      />,
    )

    expect(
      screen.getByRole('button', {
        name: 'Decrease Cam Unlimited review quantity',
      }),
    ).not.toBeDisabled()
  })
})
