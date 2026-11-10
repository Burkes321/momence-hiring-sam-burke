import { parseCnbRates } from '../types/cnb'
import type { ExchangeRateTable } from '../types/cnb'
import { RATES_ENDPOINT } from './const'

export const fetchRates = async (signal?: AbortSignal): Promise<ExchangeRateTable> => {
  const response = await fetch(RATES_ENDPOINT, { signal })

  if (!response.ok) {
    throw new Error(`Unable to fetch CNB exchange rates (HTTP ${response.status}).`)
  }

  return parseCnbRates(await response.text())
}
