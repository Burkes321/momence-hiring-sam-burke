import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { RatesTable } from './components/RatesTable'
import { CurrencyConverter } from './components/CurrencyConverter'
import { Button } from './ui/Button'
import { Feedback } from './ui/Feedback'
import { Typography } from './ui/Typography'
import { CnbParseError } from './utils/cnb'
import { useExchangeRates } from './hooks/useExchangeRates'
import { DARK_THEME, LIGHT_THEME } from './styles/const'
import { GlobalStyle } from './styles/GlobalStyle'
import { Eyebrow, Header, Page, RequestBar, ThemeControl } from './App.styles'

export const App = () => {
  const [isDark, setIsDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  const { data, isPending, isError, error, refetch, isFetching, fetchStatus } = useExchangeRates()
  const isPaused = fetchStatus === 'paused'
  const IDLE_REFRESH_LABEL = isError ? 'Retry' : 'Refresh rates'
  const ACTIVE_REFRESH_LABEL = isFetching ? 'Fetching rates…' : IDLE_REFRESH_LABEL
  const REFRESH_LABEL = isPaused ? 'Waiting for connection…' : ACTIVE_REFRESH_LABEL

  return (
    <ThemeProvider theme={isDark ? DARK_THEME : LIGHT_THEME}>
      <GlobalStyle />
      <Page>
        <Header>
          <div>
            <Eyebrow variant="small" tone="accent" weight="bold">Czech National Bank · Reference rates</Eyebrow>
            <Typography as="h1" variant="title">CZK Currency Converter</Typography>
            <Typography tone="muted">Convert Czech koruna using the latest available official CNB fixing.</Typography>
          </div>
          <ThemeControl>
            <input type="checkbox" checked={isDark} onChange={({ currentTarget }) => setIsDark(currentTarget.checked)} />
            <Typography as="span" variant="small">Dark theme</Typography>
          </ThemeControl>
        </Header>
        {isPaused && <Feedback><Typography as="output">Waiting for a network connection…</Typography></Feedback>}
        {isPending && !isPaused && <Feedback><Typography as="output">Loading exchange rates…</Typography></Feedback>}
        {isError && (
          <Feedback role="alert" $tone="error">
            <Typography>
              {data !== undefined && 'Refresh failed. Showing the previously loaded rates. '}
              {error instanceof CnbParseError ? 'CNB returned data we couldn’t read.' : 'Unable to load CNB exchange rates.'}
            </Typography>
          </Feedback>
        )}
        <RequestBar>
          <Typography variant="small">Official fixing rates · CZK to foreign currency</Typography>
          {data !== undefined && isFetching && <Typography as="output" variant="small">Refreshing rates…</Typography>}
          <Button type="button" $variant="secondary" onClick={() => void refetch()} disabled={isFetching || isPaused}>
            <Typography as="span" weight="semibold">{REFRESH_LABEL}</Typography>
          </Button>
        </RequestBar>
        {data !== undefined && <>
          <CurrencyConverter {...data} />
          <RatesTable {...data} />
        </>}
        <Typography as="footer" variant="small" tone="muted">Source: <Typography as="a" href="https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/" variant="small" tone="accent">Czech National Bank</Typography>. Reference rates exclude provider fees and spreads.</Typography>
      </Page>
    </ThemeProvider>
  )
}
