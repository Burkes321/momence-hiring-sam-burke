import { useQuery } from '@tanstack/react-query'
import { fetchRates } from '../api/fetchRates'

export const useExchangeRates = () =>
  useQuery({
    queryKey: ['exchange-rates', 'cnb'],
    queryFn: ({ signal }) => fetchRates(signal),
  })
