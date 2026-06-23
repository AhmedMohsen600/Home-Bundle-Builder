// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import type { ReviewGroups } from '../types/bundle.types'
import { ReviewPanel } from './ReviewPanel'

const emptyGroups: ReviewGroups = {
  cameras: [],
  sensors: [],
  accessories: [],
  plan: [],
}

describe('ReviewPanel', () => {
  afterEach(() => {
    cleanup()
  })

  const renderPanel = () =>
    render(
      <ReviewPanel
        groups={emptyGroups}
        totals={{ compareAt: 238.81, price: 187.89, savings: 50.92 }}
        onSetQuantity={() => {}}
        onSave={() => {}}
        onCheckout={() => {}}
        saveMessage=""
        checkoutMessage=""
      />,
    )

  it('renders the provided fast shipping SVG icon', () => {
    renderPanel()

    const icon = screen.getByTestId('review-fast-shipping-icon')

    expect(icon).toHaveAttribute('width', '41')
    expect(icon).toHaveAttribute('height', '41')
    expect(icon.querySelector('rect[fill="white"]')).toBeInTheDocument()
    expect(icon.querySelector('path[fill="#0AA288"]')).toBeInTheDocument()
  })

  it('uses the Figma save link typography', () => {
    renderPanel()

    expect(
      screen.getByRole('button', { name: 'Save my system for later' }),
    ).toHaveClass(
      'text-[14px]',
      'font-normal',
      'italic',
      'leading-[1.2]',
      'tracking-[-0.02px]',
      'text-center',
      'underline',
      'decoration-solid',
    )
  })

  it('renders the total pricing block like the Figma review panel', () => {
    renderPanel()

    const financingPill = screen.getByText('as low as $19.19/mo')
    const totalRow = screen.getByTestId('review-total-row')

    expect(financingPill).toHaveClass(
      'self-end',
      'rounded-[3px]',
      'bg-wyze-purple',
      'px-3',
      'py-1',
      'text-[13px]',
      'font-medium',
      'text-white',
    )
    expect(totalRow).toHaveClass(
      'flex',
      'items-baseline',
      'justify-end',
      'gap-[10px]',
    )
    expect(screen.getByText('$238.81')).toHaveClass(
      'text-[18px]',
      'font-semibold',
      'leading-none',
      'text-wyze-discount',
      'line-through',
    )
    expect(screen.getByText('$187.89')).toHaveClass(
      'text-[24px]',
      'font-bold',
      'leading-none',
      'text-wyze-purple',
    )
  })
})
