import { useId, useState } from 'react'
import type { ExchangeRateTable } from '../types/cnb'
import { convertCzkToCurrency, formatCurrency, normalizedCzkPerUnit, parseCzkInput } from '../utils/currency'
import { AMOUNT_INPUT_HELP, AMOUNT_RANGE_ERROR, FIXING_DATE_FORMATTER, NORMALIZED_QUOTE_FORMATTER, QUOTE_FORMATTER } from './const'
import { Field } from '../ui/Field'
import { Input, Select } from '../ui/Controls'
import { Typography } from '../ui/Typography'
import { ConverterSurface, Fields, QuoteDetails, Result } from './CurrencyConverter.styles'

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
      <Typography as="h2" variant="heading">Convert CZK</Typography>
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
              <Typography as="option" key={code} value={code}>{code} — {country}, {currency}</Typography>
            ))}
          </Select>
        </Field>
      </Fields>
      <Result aria-live="polite" aria-atomic="true">
        {result !== null && selectedRate && <Typography as="output" variant="result" htmlFor={`${id}-amount ${id}-currency`}><Typography as="span" variant="small" weight="medium">Approximately </Typography>{formatCurrency(result, selectedRate.code)}</Typography>}
        {VALIDATION_ERROR && <Typography>Enter a valid amount to see your conversion.</Typography>}
      </Result>
      {selectedRate && (
        <QuoteDetails>
          <div>
            <Typography variant="small" tone="text" weight="semibold">{QUOTE_FORMATTER.format(selectedRate.amount)} {selectedRate.code} = {QUOTE_FORMATTER.format(selectedRate.rate)} CZK</Typography>
            <Typography variant="small" tone="muted">1 {selectedRate.code} = {NORMALIZED_QUOTE_FORMATTER.format(normalizedCzkPerUnit(selectedRate))} CZK</Typography>
          </div>
          <Typography variant="small" tone="muted">Fixing date: <time dateTime={publishedAt}>{FIXING_DATE_FORMATTER.format(new Date(`${publishedAt}T00:00:00Z`))}</time></Typography>
        </QuoteDetails>
      )}
      <Typography variant="small" tone="muted">CNB reference rates exclude provider fees and spreads. Displayed conversions are rounded estimates.</Typography>
    </ConverterSurface>
  )
}
