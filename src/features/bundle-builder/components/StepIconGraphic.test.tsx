// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StepIconGraphic } from './StepIconGraphic'

describe('StepIconGraphic', () => {
  it('renders the Figma camera icon artwork', () => {
    const { container } = render(<StepIconGraphic icon="camera" size={26} />)

    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 26 26')
    expect(svg).toHaveAttribute('width', '26')
    expect(svg).toHaveAttribute('height', '26')
    expect(
      container.querySelector('rect[x="3.1875"][y="0.75"][rx="3.25"]'),
    ).toBeInTheDocument()
    expect(
      container.querySelector('path[d="M22.75 24.9167L3.25 24.9167"]'),
    ).toBeInTheDocument()
  })

  it('renders the Figma plan shield icon artwork', () => {
    const { container } = render(<StepIconGraphic icon="shield" size={26} />)

    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 26 27')
    expect(svg).toHaveAttribute('width', '26')
    expect(svg).toHaveAttribute('height', '27')
    expect(container.querySelector('path[fill="#F0F0F0"]')).toBeInTheDocument()
    expect(container.querySelector('path[stroke="#6F7882"]')).toBeInTheDocument()
  })

  it('renders the Figma sensors waiting icon artwork', () => {
    const { container } = render(<StepIconGraphic icon="sensor" size={28} />)

    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 28 28')
    expect(svg).toHaveAttribute('width', '28')
    expect(svg).toHaveAttribute('height', '28')
    expect(
      container.querySelector(
        'path[d="M26.7749 21.6328C19.5136 28.5661 8.03616 28.4505 0.774902 21.5172"]',
      ),
    ).toBeInTheDocument()
  })

  it('renders the Figma extra protection icon artwork', () => {
    const { container } = render(<StepIconGraphic icon="plus" size={26} />)

    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 26 26')
    expect(svg).toHaveAttribute('width', '26')
    expect(svg).toHaveAttribute('height', '26')
    expect(
      container.querySelector('path[d="M16.478 6.47826L12.9997 3L9.52148 6.47826"]'),
    ).toBeInTheDocument()
  })
})
