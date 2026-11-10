import styled from 'styled-components'
import type { ExchangeRateTable } from '../types/cnb'
import { FIXING_DATE_FORMATTER, QUOTE_FORMATTER } from './const'

const ScrollRegion = styled.section`
  max-width: 100%;
  overflow-x: auto;
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  caption {
    text-align: left;
    padding-block: 1rem;
    font-weight: 600;
  }
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid currentColor;
  }
  th:last-child, td:last-child {
    text-align: right;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
`

export const RatesTable = ({ publishedAt, rates }: ExchangeRateTable) => (
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
)
