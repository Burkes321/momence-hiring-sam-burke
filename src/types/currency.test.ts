import { describe, expect, it } from 'vitest'
import fixture from '../test/fixtures/cnb-rates.txt?raw'
import { parseCnbRates } from './cnb'
import { convertCzkToCurrency, formatCurrency, normalizedCzkPerUnit, parseCzkInput } from './currency'

describe('currency conversion', () => {
  it.each([
    ['EUR', 40, 25],
    ['HUF', 16000, 0.0625],
    ['JPY', 8000, 0.125],
    ['IDR', 800000, 0.00125],
    ['TRY', 2500, 0.4],
  ])('respects the quotation quantity for %s', (code, expected, normalized) => {
    const rate = parseCnbRates(fixture).rates.find((rate) => rate.code === code)!
    expect(convertCzkToCurrency(1000, rate)).toBe(expected)
    expect(normalizedCzkPerUnit(rate)).toBe(normalized)
    expect(convertCzkToCurrency(0, rate)).toBe(0)
  })

  it.each([-1, Infinity, -Infinity, NaN])('rejects invalid CZK amount %s', (amount) => {
    expect(() => convertCzkToCurrency(amount, parseCnbRates(fixture).rates[0])).toThrow(RangeError)
  })

  it.each([
    { amount: 0 }, { amount: -1 }, { amount: 1.5 }, { amount: Infinity },
    { rate: 0 }, { rate: -1 }, { rate: Infinity }, { rate: NaN },
  ])('rejects invalid quotation %o', (override) => {
    const rate = { ...parseCnbRates(fixture).rates[0], ...override }
    expect(() => convertCzkToCurrency(1000, rate)).toThrow(RangeError)
    expect(() => normalizedCzkPerUnit(rate)).toThrow(RangeError)
  })

  it('rejects overflow instead of displaying infinity', () => {
    expect(() => convertCzkToCurrency(Number.MAX_VALUE, parseCnbRates(fixture).rates[1])).toThrow(RangeError)
  })

  it('rounds only for display using standard currency precision', () => {
    const rate = { ...parseCnbRates(fixture).rates[0], rate: 3 }
    expect(convertCzkToCurrency(1, rate)).toBe(1 / 3)
    expect(formatCurrency(1 / 3, 'EUR')).toMatch(/EUR\s0\.33/)
    expect(formatCurrency(1234.56, 'JPY')).toMatch(/JPY\s1,235/)
  })
})

describe('CZK input', () => {
  it.each([['0', 0], ['1000', 1000], ['12.34', 12.34], ['.5', 0.5], ['1.', 1]])('accepts %s', (input, expected) => {
    expect(parseCzkInput(input)).toBe(expected)
  })
  it.each(['', ' ', '-1', 'NaN', 'Infinity', '1.234', '12oops', '1e3', '1,25', '9'.repeat(400)])('rejects %s', (input) => {
    expect(parseCzkInput(input)).toBeNull()
  })
})
