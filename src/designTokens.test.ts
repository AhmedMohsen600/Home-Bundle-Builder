/// <reference types="node" />

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('design tokens', () => {
  it('uses Gilroy as the primary sans-serif font', () => {
    const css = readFileSync(join(process.cwd(), 'src/index.css'), 'utf8')

    expect(css).not.toContain('fonts.googleapis.com/css2?family=Inter')
    expect(css).toContain("--font-sans: 'Gilroy'")
  })

  it('defines the Figma selected card border color', () => {
    const css = readFileSync(join(process.cwd(), 'src/index.css'), 'utf8')

    expect(css).toContain('--color-wyze-card-selected: #836edf;')
  })
})
