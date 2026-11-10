import type { ExchangeRate, ExchangeRateTable } from '../types/cnb.ts'
import { CNB_HEADER, CNB_MONTHS } from './const.ts'

export class CnbParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CnbParseError'
  }
}

export const parseCnbRates = (raw: string): ExchangeRateTable => {
  const lines = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trimEnd().split('\n')
  const metadata = /^(\d{2}) ([A-Z][a-z]{2}) (\d{4}) #(\d+)$/.exec(lines[0])

  if (!metadata) throw new CnbParseError('Invalid CNB metadata line.')

  const [, dayText, monthText, yearText, sequenceText] = metadata
  const day = Number(dayText)
  const month = CNB_MONTHS.indexOf(monthText)
  const year = Number(yearText)
  const date = new Date(0)
  date.setUTCFullYear(year, month, day)

  if (month < 0 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
    throw new CnbParseError('Invalid CNB fixing date.')
  }

  const sequence = Number(sequenceText)
  if (!Number.isSafeInteger(sequence) || sequence <= 0) {
    throw new CnbParseError('Invalid CNB sequence.')
  }
  if (lines[1] !== CNB_HEADER) {
    throw new CnbParseError('Invalid CNB header.')
  }
  if (lines.length < 3) throw new CnbParseError('CNB feed contains no currency rows.')

  const codes = new Set<string>()
  const rates = lines.slice(2).map((line, index): ExchangeRate => {
    const fields = line.split('|').map((field) => field.trim())
    const lineNumber = index + 3
    if (fields.length !== 5) {
      throw new CnbParseError(`Invalid CNB row on line ${lineNumber}: expected five fields.`)
    }
    const [country, currency, amountText, code, rateText] = fields
    if (!country || !currency || !/^[A-Z]{3}$/.test(code)) {
      throw new CnbParseError(`Invalid CNB currency on line ${lineNumber}.`)
    }
    const amount = Number(amountText)
    if (!/^\d+$/.test(amountText) || !Number.isSafeInteger(amount) || amount <= 0) {
      throw new CnbParseError(`Invalid CNB amount on line ${lineNumber}: expected a positive integer.`)
    }
    const rate = Number(rateText)
    if (!/^\d+(?:\.\d+)?$/.test(rateText) || !Number.isFinite(rate) || rate <= 0) {
      throw new CnbParseError(`Invalid CNB rate on line ${lineNumber}: expected a positive decimal.`)
    }
    if (codes.has(code)) throw new CnbParseError(`Duplicate CNB currency code: ${code}.`)
    codes.add(code)
    return { country, currency, amount, code, rate }
  })

  return { publishedAt: `${yearText}-${String(month + 1).padStart(2, '0')}-${dayText}`, sequence, rates }
}

