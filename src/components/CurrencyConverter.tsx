import { useId, useState } from 'react'
import type { ExchangeRateTable } from '../types/cnb'
import { convertCzkToCurrency, formatCurrency, normalizedCzkPerUnit, parseCzkInput } from '../utils/currency'
import { AMOUNT_INPUT_HELP, AMOUNT_RANGE_ERROR, FIXING_DATE_FORMATTER, NORMALIZED_QUOTE_FORMATTER, QUOTE_FORMATTER } from './const'
import { Field } from '../ui/Field'
import { Input, Select } from '../ui/Controls'
import { ConverterSurface, Fields, Note, QuoteDetails, Result } from './CurrencyConverter.styles'

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
    <ConverterSurface aria-label="Currency converter">
      <h2>Convert CZK</h2>
      <Fields>
        <Field label="Amount in CZK" htmlFor={`${id}-amount`} help={AMOUNT_INPUT_HELP} error={VALIDATION_ERROR}>
          <Input
            id={`${id}-amount`}
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            required
            value={amountInput}
            aria-describedby={VALIDATION_ERROR ? `${id}-amount-error` : `${id}-amount-help`}
            aria-invalid={VALIDATION_ERROR !== null}
            onChange={({ currentTarget }) => {
              setAmountInput(currentTarget.value)
              setBrowserInvalid(!currentTarget.validity.valid)
            }}
          />
        </Field>
        <Field label="Convert to" htmlFor={`${id}-currency`}>
          <Select id={`${id}-currency`} value={selectedRate?.code ?? ''} onChange={({ currentTarget }) => setSelectedCode(currentTarget.value)}>
            {rates.map(({ code, country, currency }) => (
              <option key={code} value={code}>{code} — {country}, {currency}</option>
            ))}
          </Select>
        </Field>
      </Fields>
      <Result aria-live="polite" aria-atomic="true">
        {result !== null && selectedRate && <output htmlFor={`${id}-amount ${id}-currency`}><span>Approximately </span>{formatCurrency(result, selectedRate.code)}</output>}
        {VALIDATION_ERROR && <p>Enter a valid amount to see your conversion.</p>}
      </Result>
      {selectedRate && (
        <QuoteDetails>
          <div>
            <p>{QUOTE_FORMATTER.format(selectedRate.amount)} {selectedRate.code} = {QUOTE_FORMATTER.format(selectedRate.rate)} CZK</p>
            <p>1 {selectedRate.code} = {NORMALIZED_QUOTE_FORMATTER.format(normalizedCzkPerUnit(selectedRate))} CZK</p>
          </div>
          <p>Fixing date: <time dateTime={publishedAt}>{FIXING_DATE_FORMATTER.format(new Date(`${publishedAt}T00:00:00Z`))}</time></p>
        </QuoteDetails>
      )}
      <Note>CNB reference rates exclude provider fees and spreads. Displayed conversions are rounded estimates.</Note>
    </ConverterSurface>
  )
}
