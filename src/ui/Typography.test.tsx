// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { afterEach, describe, expect, it } from 'vitest'
import { DARK_THEME, LIGHT_THEME } from '../styles/const'
import { Typography } from './Typography'

afterEach(cleanup)

describe('Typography', () => {
  it('defaults to a paragraph and keeps styling props out of the DOM', () => {
    render(<ThemeProvider theme={LIGHT_THEME}>
      <Typography tone="muted" weight="semibold" data-testid="text">Reference rates</Typography>
    </ThemeProvider>)
    const text = screen.getByTestId('text')
    expect(text.tagName).toBe('P')
    for (const prop of ['variant', 'tone', 'weight', '$variant', '$tone', '$weight']) {
      expect(text).not.toHaveAttribute(prop)
    }
  })

  it('preserves heading, label, and output semantics and their native attributes', () => {
    render(<ThemeProvider theme={LIGHT_THEME}>
      <Typography as="h2" variant="heading">Convert CZK</Typography>
      <Typography as="label" htmlFor="amount">Amount in CZK</Typography>
      <input id="amount" />
      <Typography as="output" variant="result" htmlFor="amount">40 EUR</Typography>
    </ThemeProvider>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Convert CZK')
    expect(screen.getByLabelText('Amount in CZK')).toHaveAttribute('id', 'amount')
    expect(screen.getByRole('status')).toHaveAttribute('for', 'amount')
  })

  it('updates text color when the theme changes', () => {
    const { rerender } = render(<ThemeProvider theme={LIGHT_THEME}>
      <Typography tone="muted">Reference rates</Typography>
    </ThemeProvider>)
    expect(screen.getByText('Reference rates')).toHaveStyle({ color: LIGHT_THEME.colors.muted })
    rerender(<ThemeProvider theme={DARK_THEME}>
      <Typography tone="muted">Reference rates</Typography>
    </ThemeProvider>)
    expect(screen.getByText('Reference rates')).toHaveStyle({ color: DARK_THEME.colors.muted })
  })
})
