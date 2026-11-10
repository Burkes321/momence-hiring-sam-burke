import type { UseQueryOptions } from '@tanstack/react-query'
import { CnbParseError } from '../utils/cnb'
import type { ExchangeRateTable } from '../types/cnb'

export const EXCHANGE_RATES_QUERY_OPTIONS = {
  staleTime: 60 * 60 * 1000,
  gcTime: 2 * 60 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: true,
  refetchInterval: false,
  retry: (failureCount, error) => !(error instanceof CnbParseError) && failureCount < 1,
  retryDelay: 1000,
} satisfies Omit<UseQueryOptions<ExchangeRateTable, Error>, 'queryKey' | 'queryFn'>
