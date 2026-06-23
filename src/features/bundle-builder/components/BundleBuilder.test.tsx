// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { BundleBuilder } from '../BundleBuilder'
import type { BundleCatalog } from '../types/bundle.types'

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

describe('BundleBuilder', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('matches the Figma frame structure instead of rendering a page hero', () => {
    render(<BundleBuilder catalog={sampleCatalog} />)

    expect(
      screen.queryByRole('heading', {
        name: 'Build your home security system',
      }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('REVIEW')).toBeInTheDocument()
  })

  it('renders the Figma satisfaction guarantee badge asset', () => {
    render(<BundleBuilder catalog={sampleCatalog} />)

    expect(
      screen.getByAltText('100% Wyze satisfaction guarantee'),
    ).toHaveAttribute('src', '/wyze-satisfaction-guarantee.png')
  })

  it('applies the Figma product card container tokens', () => {
    render(<BundleBuilder catalog={sampleCatalog} />)

    expect(screen.getByTestId('product-card-cam-v4')).toHaveClass(
      'w-full',
      'min-h-[159px]',
      'rounded-[10px]',
      'border-2',
      'border-wyze-card-selected',
      'p-[11px]',
    )
  })

  it('places the active step title below the eyebrow divider', () => {
    render(<BundleBuilder catalog={sampleCatalog} />)

    const eyebrowDivider = screen.getByTestId('step-eyebrow-row-cameras')
    const titleRow = screen.getByText('Choose your cameras').closest('[data-step-title-row]')

    expect(eyebrowDivider).toHaveClass('border-b')
    expect(titleRow).toHaveClass('px-4')
    expect(titleRow?.querySelector('svg')).toHaveAttribute('width', '26')
  })

  it('keeps 16px between the step title row and product cards', () => {
    render(<BundleBuilder catalog={sampleCatalog} />)

    expect(screen.getByTestId('step-content-cameras')).toHaveClass('pt-4')
  })

  it('renders closed steps with Figma title-row spacing', () => {
    render(<BundleBuilder catalog={sampleCatalog} />)

    const eyebrowDivider = screen.getByTestId('step-eyebrow-row-plan')
    const titleRow = screen.getByText('Choose your plan').closest('[data-step-closed-title-row]')
    const titleText = screen.getByText('Choose your plan')
    const iconTitleGroup = titleText.parentElement

    expect(eyebrowDivider).toHaveClass('border-b')
    expect(eyebrowDivider).toHaveClass('text-[10px]')
    expect(titleRow).toHaveClass('px-[15px]', 'py-5')
    expect(titleRow).not.toHaveClass('min-h-[118px]')
    expect(iconTitleGroup).toHaveClass('gap-2')
    expect(titleText).toHaveClass('text-[22px]')
    expect(titleRow?.querySelector('svg')).toHaveAttribute('width', '26')
    expect(titleRow?.querySelector('svg')).toHaveAttribute('height', '27')
  })

  it('does not render generated punctuation artifacts', () => {
    render(<BundleBuilder catalog={sampleCatalog} />)

    const visibleText = document.body.textContent ?? ''

    expect(visibleText).not.toMatch(/pain:/i)
    expect(visibleText).not.toContain(':')
    expect(visibleText).not.toContain(';')
    expect(visibleText).not.toContain('__')
  })

  it('keeps long next-step labels on one line', async () => {
    const user = userEvent.setup()
    render(<BundleBuilder catalog={sampleCatalog} />)

    await user.click(screen.getByRole('button', { name: 'Next Choose your plan' }))

    expect(
      screen.getByRole('button', { name: 'Next Choose your sensors' }),
    ).toHaveClass('w-fit', 'max-w-full', 'whitespace-nowrap')
  })

  it('syncs variant quantities between product cards and the review panel', async () => {
    const user = userEvent.setup()
    render(<BundleBuilder catalog={sampleCatalog} />)

    expect(screen.getByTestId('product-quantity-cam-v4')).toHaveTextContent('1')
    expect(screen.getByText('Wyze Cam v4 - White')).toBeInTheDocument()
    expect(screen.getByText('Wyze Cam v4 - Black')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Black for Wyze Cam v4' }))

    expect(screen.getByTestId('product-quantity-cam-v4')).toHaveTextContent('2')

    await user.click(
      within(screen.getByTestId('product-card-cam-v4')).getByRole('button', {
        name: 'Increase Wyze Cam v4 quantity',
      }),
    )

    expect(screen.getByTestId('product-quantity-cam-v4')).toHaveTextContent('3')
    expect(screen.getByTestId('review-quantity-cam-v4:black')).toHaveTextContent(
      '3',
    )
  })

  it('lets shoppers add a product back after its active variant reaches zero', async () => {
    const user = userEvent.setup()
    render(<BundleBuilder catalog={sampleCatalog} />)

    const card = screen.getByTestId('product-card-cam-v4')

    await user.click(
      within(card).getByRole('button', {
        name: 'Decrease Wyze Cam v4 quantity',
      }),
    )

    expect(screen.queryByText('Wyze Cam v4 - White')).not.toBeInTheDocument()

    await user.click(
      within(card).getByRole('button', {
        name: 'Increase Wyze Cam v4 quantity',
      }),
    )

    expect(screen.getByTestId('product-quantity-cam-v4')).toHaveTextContent('1')
    expect(screen.getByTestId('review-quantity-cam-v4:white')).toHaveTextContent(
      '1',
    )
  })

  it('saves and restores the shopper configuration from localStorage', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<BundleBuilder catalog={sampleCatalog} />)

    await user.click(screen.getByRole('button', { name: 'Black for Wyze Cam v4' }))
    await user.click(
      within(screen.getByTestId('product-card-cam-v4')).getByRole('button', {
        name: 'Increase Wyze Cam v4 quantity',
      }),
    )
    await user.click(screen.getByRole('button', { name: 'Save my system for later' }))

    unmount()
    render(<BundleBuilder catalog={sampleCatalog} />)

    expect(screen.getByTestId('product-quantity-cam-v4')).toHaveTextContent('3')
    expect(screen.getByTestId('review-quantity-cam-v4:black')).toHaveTextContent(
      '3',
    )
    expect(screen.getByText('Saved. Your system is ready when you return.')).toBeInTheDocument()
  })
})
