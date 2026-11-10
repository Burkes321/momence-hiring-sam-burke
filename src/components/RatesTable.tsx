import type { ExchangeRateTable } from '../types/cnb'
import { FIXING_DATE_FORMATTER, QUOTE_FORMATTER } from './const'
import { Description, RatesSurface, ScrollRegion, Table } from './RatesTable.styles'

export const RatesTable = ({ publishedAt, rates }: ExchangeRateTable) => (
  <RatesSurface aria-labelledby="rates-heading">
    <h2 id="rates-heading">Exchange rates</h2>
    <Description>Official quotations show the CZK price for the stated number of foreign currency units.</Description>
    <ScrollRegion aria-label="CNB exchange rates" tabIndex={0}>
      <Table>
        <caption>
          Fixing date: <time dateTime={publishedAt}>{FIXING_DATE_FORMATTER.format(new Date(`${publishedAt}T00:00:00Z`))}</time>
        </caption>
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Currency</th>
            <th scope="col">Code</th>
            <th scope="col">Official CNB quote</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(({ country, currency, code, amount, rate }) => (
            <tr key={code}>
              <td>{country}</td>
              <td>{currency}</td>
              <td>{code}</td>
              <td>{QUOTE_FORMATTER.format(amount)} {code} = {QUOTE_FORMATTER.format(rate)} CZK</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollRegion>
  </RatesSurface>
)
