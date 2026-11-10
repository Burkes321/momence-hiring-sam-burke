import { QueryClient } from '@tanstack/react-query'
import type { DefaultOptions } from '@tanstack/react-query'
import { CnbParseError } from './utils/cnb'

export const QUERY_DEFAULT_OPTIONS = {
  staleTime: 60 * 60 * 1000,
  gcTime: 2 * 60 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: true,
  refetchInterval: false,
  retry: (failureCount, error) => !(error instanceof CnbParseError) && failureCount < 1,
  retryDelay: 1000,
} satisfies DefaultOptions['queries']

export const queryClient = new QueryClient({
  defaultOptions: { queries: QUERY_DEFAULT_OPTIONS },
})
