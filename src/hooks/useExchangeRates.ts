import { useQuery } from '@tanstack/react-query'
import { fetchRates } from '../api/fetchRates'

export const useExchangeRates = () =>
  useQuery({
    queryKey: ['exchange-rates', 'cnb'],
    queryFn: ({ signal }) => fetchRates(signal),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: false,
    retry: 1,
    retryDelay: 1000,
  })
