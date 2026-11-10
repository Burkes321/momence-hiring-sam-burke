import { Typography } from '../ui/Typography'
import type { ExchangeRateTable } from '../types/cnb'
import { FIXING_DATE_FORMATTER, QUOTE_FORMATTER } from './const'
import { RatesSurface, ScrollRegion, Table } from './RatesTable.styles'

export const RatesTable = ({ publishedAt, rates }: ExchangeRateTable) => (
  <RatesSurface aria-labelledby="rates-heading">
    <Typography as="h2" variant="heading" id="rates-heading">Exchange rates</Typography>
    <Typography variant="small" tone="muted">Official quotations show the CZK price for the stated number of foreign currency units.</Typography>
    <ScrollRegion aria-label="CNB exchange rates" tabIndex={0}>
      <Table>
        <Typography as="caption" variant="small" tone="muted">
          Fixing date: <time dateTime={publishedAt}>{FIXING_DATE_FORMATTER.format(new Date(`${publishedAt}T00:00:00Z`))}</time>
        </Typography>
        <thead>
          <tr>
            <Typography as="th" variant="small" weight="semibold" scope="col">Country</Typography>
            <Typography as="th" variant="small" weight="semibold" scope="col">Currency</Typography>
            <Typography as="th" variant="small" weight="semibold" scope="col">Code</Typography>
            <Typography as="th" variant="small" weight="semibold" scope="col">Official CNB quote</Typography>
          </tr>
        </thead>
        <tbody>
          {rates.map(({ country, currency, code, amount, rate }) => (
            <tr key={code}>
              <Typography as="td" variant="small">{country}</Typography>
              <Typography as="td" variant="small">{currency}</Typography>
              <Typography as="td" variant="small" weight="semibold">{code}</Typography>
              <Typography as="td" variant="small">{QUOTE_FORMATTER.format(amount)} {code} = {QUOTE_FORMATTER.format(rate)} CZK</Typography>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollRegion>
  </RatesSurface>
)
