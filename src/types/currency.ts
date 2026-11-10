import type { ExchangeRate } from './cnb'
import { CURRENCY_FORMATTERS } from './const'

export const normalizedCzkPerUnit = ({ amount, rate }: ExchangeRate): number => {
  if (!Number.isSafeInteger(amount) || amount <= 0 || !Number.isFinite(rate) || rate <= 0) {
    throw new RangeError('Invalid exchange-rate quotation.')
  }
  const normalized = rate / amount
  if (!Number.isFinite(normalized) || normalized <= 0) {
    throw new RangeError('Quotation is outside the supported range.')
  }
  return normalized
}

export const convertCzkToCurrency = (czkAmount: number, exchangeRate: ExchangeRate): number => {
  if (!Number.isFinite(czkAmount) || czkAmount < 0) {
    throw new RangeError('CZK amount must be finite and non-negative.')
  }
  normalizedCzkPerUnit(exchangeRate)
  const result = czkAmount === 0 ? 0 : czkAmount * (exchangeRate.amount / exchangeRate.rate)
  if (!Number.isFinite(result)) throw new RangeError('Converted amount is outside the supported range.')
  return result
}

export const parseCzkInput = (input: string): number | null => {
  if (!/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(input)) return null
  const amount = Number(input)
  return Number.isFinite(amount) ? amount : null
}

export const formatCurrency = (amount: number, code: string): string => {
  let formatter = CURRENCY_FORMATTERS.get(code)
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: code, currencyDisplay: 'code' })
    CURRENCY_FORMATTERS.set(code, formatter)
  }
  return formatter.format(amount)
}
