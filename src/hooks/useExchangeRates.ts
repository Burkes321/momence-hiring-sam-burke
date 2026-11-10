import { useQuery } from '@tanstack/react-query'
import { fetchRates } from '../api/fetchRates'
import { EXCHANGE_RATES_QUERY_OPTIONS } from './const'

export const useExchangeRates = () =>
  useQuery({
    ...EXCHANGE_RATES_QUERY_OPTIONS,
    queryKey: ['exchange-rates', 'cnb'],
    queryFn: ({ signal }) => fetchRates(signal),
  })
