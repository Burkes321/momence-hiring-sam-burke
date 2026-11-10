// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import fixture from '../test/fixtures/cnb-rates.txt?raw'
import { parseCnbRates } from '../utils/cnb'
import { CurrencyConverter } from './CurrencyConverter'

afterEach(cleanup)

describe('CurrencyConverter', () => {
  it('defaults to 1000 CZK and EUR, and converts non-unit quotations', async () => {
    const user = userEvent.setup()
    render(<CurrencyConverter {...parseCnbRates(fixture)} />)
    expect(screen.getByLabelText('Amount in CZK')).toHaveValue(1000)
    expect(screen.getByLabelText('Convert to')).toHaveValue('EUR')
    expect(screen.getByRole('status')).toHaveTextContent(/Approximately EUR\s40\.00/)
    await user.selectOptions(screen.getByLabelText('Convert to'), 'HUF')
    expect(screen.getByRole('status')).toHaveTextContent(/HUF\s16,000$/)
    expect(screen.getByText('100 HUF = 6.25 CZK')).toBeInTheDocument()
    expect(screen.getByText('1 HUF = 0.0625 CZK')).toBeInTheDocument()
  })

  it('accepts zero and removes the result for empty, negative, or overly precise input', async () => {
    const user = userEvent.setup()
    render(<CurrencyConverter {...parseCnbRates(fixture)} />)
    const input = screen.getByLabelText('Amount in CZK')
    await user.clear(input)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    await user.type(input, '0')
    expect(screen.getByRole('status')).toHaveTextContent(/EUR\s0\.00/)
    for (const value of ['-1', '1.234']) {
      await user.clear(input)
      await user.type(input, value)
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    }
    await user.clear(input)
    await user.type(input, '12.34')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(screen.getByRole('status')).toHaveTextContent(/EUR\s0\.49/)
  })

  it('keeps selection and result consistent when the selected currency disappears', async () => {
    const user = userEvent.setup()
    const table = parseCnbRates(fixture)
    const { rerender } = render(<CurrencyConverter {...table} />)
    await user.selectOptions(screen.getByLabelText('Convert to'), 'HUF')
    rerender(<CurrencyConverter {...table} rates={table.rates.filter(({ code }) => code !== 'HUF')} />)
    expect(screen.getByLabelText('Convert to')).toHaveValue('EUR')
    expect(screen.getByRole('status')).toHaveTextContent(/EUR\s40\.00/)
    rerender(<CurrencyConverter {...table} rates={table.rates.filter(({ code }) => code === 'JPY')} />)
    expect(screen.getByLabelText('Convert to')).toHaveValue('JPY')
    expect(screen.getByRole('status')).toHaveTextContent(/JPY\s8,000/)
  })

  it('uses the first available currency when EUR is absent on startup', () => {
    const table = parseCnbRates(fixture)
    render(<CurrencyConverter {...table} rates={table.rates.filter(({ code }) => code !== 'EUR')} />)
    expect(screen.getByLabelText('Convert to')).toHaveValue('HUF')
    expect(screen.getByRole('status')).toHaveTextContent(/HUF\s16,000$/)
    expect(screen.getByText('6 November 2026')).toHaveAttribute('datetime', '2026-11-06')
  })
})
