import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { RatesTable } from './components/RatesTable'
import { CurrencyConverter } from './components/CurrencyConverter'
import { Button } from './components/ui/Button'
import { Feedback } from './components/ui/Feedback'
import { CnbParseError } from './utils/cnb'
import { useExchangeRates } from './hooks/useExchangeRates'
import { DARK_THEME, LIGHT_THEME } from './styles/const'
import { GlobalStyle } from './styles/GlobalStyle'
import { Eyebrow, Footer, Header, Page, RequestBar, ThemeControl } from './App.styles'

export const App = () => {
  const [isDark, setIsDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  const { data, isPending, isError, error, refetch, isFetching } = useExchangeRates()
  const IDLE_REFRESH_LABEL = isError ? 'Retry' : 'Refresh rates'
  const REFRESH_LABEL = isFetching ? 'Fetching rates…' : IDLE_REFRESH_LABEL

  return (
    <ThemeProvider theme={isDark ? DARK_THEME : LIGHT_THEME}>
      <GlobalStyle />
      <Page>
        <Header>
          <div>
            <Eyebrow>Czech National Bank · Reference rates</Eyebrow>
            <h1>CZK Currency Converter</h1>
            <p>Convert Czech koruna using the latest available official CNB fixing.</p>
          </div>
          <ThemeControl>
            <input type="checkbox" checked={isDark} onChange={({ currentTarget }) => setIsDark(currentTarget.checked)} />
            Dark theme
          </ThemeControl>
        </Header>
        {isPending && <Feedback><output>Loading exchange rates…</output></Feedback>}
        {isError && (
          <Feedback role="alert" $tone="error">
            {data !== undefined && 'Refresh failed. Showing the previously loaded rates. '}
            {error instanceof CnbParseError ? 'CNB returned data we couldn’t read.' : 'Unable to load CNB exchange rates.'}
          </Feedback>
        )}
        <RequestBar>
          <p>Official fixing rates · CZK to foreign currency</p>
          {data !== undefined && isFetching && <output>Refreshing rates…</output>}
          <Button type="button" $variant="secondary" onClick={() => void refetch()} disabled={isFetching}>
            {REFRESH_LABEL}
          </Button>
        </RequestBar>
        {data !== undefined && <>
          <CurrencyConverter {...data} />
          <RatesTable {...data} />
        </>}
        <Footer>Source: <a href="https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/">Czech National Bank</a>. Reference rates exclude provider fees and spreads.</Footer>
      </Page>
    </ThemeProvider>
  )
}
