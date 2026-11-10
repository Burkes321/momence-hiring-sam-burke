import { useId, useState } from 'react'
import type { ExchangeRateTable } from '../types/cnb'
import { convertCzkToCurrency, formatCurrency, normalizedCzkPerUnit, parseCzkInput } from '../utils/currency'
import { AMOUNT_INPUT_HELP, AMOUNT_RANGE_ERROR, FIXING_DATE_FORMATTER, NORMALIZED_QUOTE_FORMATTER, QUOTE_FORMATTER } from './const'

export const CurrencyConverter = ({ rates, publishedAt }: ExchangeRateTable) => {
  const [amountInput, setAmountInput] = useState('1000')
  const [browserInvalid, setBrowserInvalid] = useState(false)
  const [selectedCode, setSelectedCode] = useState('EUR')
  const id = useId()
  const selectedRate = rates.find(({ code }) => code === selectedCode)
    ?? rates.find(({ code }) => code === 'EUR')
    ?? rates[0]
  const amount = browserInvalid ? null : parseCzkInput(amountInput)
  let result: number | null = null
  let conversionError = false
  if (amount !== null && selectedRate) {
    try {
      result = convertCzkToCurrency(amount, selectedRate)
    } catch (error) {
      if (!(error instanceof RangeError)) throw error
      conversionError = true
    }
  }
  const RANGE_VALIDATION_ERROR = conversionError ? AMOUNT_RANGE_ERROR : null
  const VALIDATION_ERROR = amount === null ? AMOUNT_INPUT_HELP : RANGE_VALIDATION_ERROR

  return (
    <section aria-label="Currency converter">
      <h2>Convert CZK</h2>
      <p>
        <label htmlFor={`${id}-amount`}>Amount in CZK</label>{' '}
        <input
          id={`${id}-amount`}
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          required
          value={amountInput}
          aria-describedby={VALIDATION_ERROR ? `${id}-help ${id}-error` : `${id}-help`}
          aria-invalid={VALIDATION_ERROR !== null}
          onChange={({ currentTarget }) => {
            setAmountInput(currentTarget.value)
            setBrowserInvalid(!currentTarget.validity.valid)
          }}
        />
      </p>
      <p id={`${id}-help`}>{AMOUNT_INPUT_HELP}</p>
      <p>
        <label htmlFor={`${id}-currency`}>Convert to</label>{' '}
        <select id={`${id}-currency`} value={selectedRate?.code ?? ''} onChange={({ currentTarget }) => setSelectedCode(currentTarget.value)}>
          {rates.map(({ code, country, currency }) => (
            <option key={code} value={code}>{code} — {country}, {currency}</option>
          ))}
        </select>
      </p>
      <div aria-live="polite" aria-atomic="true">
        {VALIDATION_ERROR && <p id={`${id}-error`}>{VALIDATION_ERROR}</p>}
        {result !== null && selectedRate && <p><output htmlFor={`${id}-amount ${id}-currency`}>Approximately {formatCurrency(result, selectedRate.code)}</output></p>}
      </div>
      {selectedRate && (
        <>
          <p>{QUOTE_FORMATTER.format(selectedRate.amount)} {selectedRate.code} = {QUOTE_FORMATTER.format(selectedRate.rate)} CZK</p>
          <p>1 {selectedRate.code} = {NORMALIZED_QUOTE_FORMATTER.format(normalizedCzkPerUnit(selectedRate))} CZK</p>
        </>
      )}
      <p>Fixing date: <time dateTime={publishedAt}>{FIXING_DATE_FORMATTER.format(new Date(`${publishedAt}T00:00:00Z`))}</time></p>
      <p>CNB reference rates exclude provider fees and spreads. Displayed conversions are rounded estimates.</p>
    </section>
  )
}
