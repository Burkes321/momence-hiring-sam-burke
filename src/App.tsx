import { RatesTable } from './components/RatesTable'
import { CurrencyConverter } from './components/CurrencyConverter'
import { CnbParseError } from './types/cnb'
import { useExchangeRates } from './hooks/useExchangeRates'

export const App = () => {
  const { data, isPending, isError, error, refetch, isFetching } = useExchangeRates()
  const IDLE_REFRESH_LABEL = isError ? 'Retry' : 'Refresh rates'
  const REFRESH_LABEL = isFetching ? 'Fetching rates…' : IDLE_REFRESH_LABEL

  return (
    <main>
      <h1>CZK Currency Converter</h1>
      <p>Convert Czech koruna using the latest available official CNB fixing.</p>
      {isPending && <p><output>Loading exchange rates…</output></p>}
      {isError && (
        <p role="alert">
          {data !== undefined && 'Refresh failed. Showing the previously loaded rates. '}
          {error instanceof CnbParseError ? 'CNB returned data we couldn’t read.' : 'Unable to load CNB exchange rates.'}
        </p>
      )}
      {data !== undefined && isFetching && <p><output>Refreshing rates…</output></p>}
      <button type="button" onClick={() => void refetch()} disabled={isFetching}>
        {REFRESH_LABEL}
      </button>
      {data !== undefined && <>
        <CurrencyConverter {...data} />
        <RatesTable {...data} />
      </>}
    </main>
  )
}
