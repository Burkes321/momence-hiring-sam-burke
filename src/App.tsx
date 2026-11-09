import { useEffect } from 'react'
import { useExchangeRates } from './hooks/useExchangeRates'

export const App = () => {
  const { data, isPending, isError, error, refetch, isFetching } = useExchangeRates()

  useEffect(() => {
    if (import.meta.env.DEV && data !== undefined) {
      console.log('CNB exchange rates (raw feed):\n', data)
    }
  }, [data])

  return (
    <main>
      <h1>CZK Currency Converter</h1>
      <p>Convert Czech koruna using the latest available official CNB fixing.</p>
      {isPending && <p><output>Loading exchange rates…</output></p>}
      {isError && <p role="alert">{error.message}</p>}
      {data !== undefined && (
        <p><output>Exchange rates loaded. Open the browser console to inspect the CNB feed.</output></p>
      )}
      <button type="button" onClick={() => void refetch()} disabled={isFetching}>
        {isFetching ? 'Fetching rates…' : isError ? 'Retry' : 'Refresh rates'}
      </button>
    </main>
  )
}
