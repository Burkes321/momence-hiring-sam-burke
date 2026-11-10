import { CNB_RATES_URL } from './src/api/const.ts'

const cnbRatesUrl = new URL(CNB_RATES_URL)

export const VITE_PROXY_OPTIONS = {
  '^/api/rates$': {
    target: cnbRatesUrl.origin,
    changeOrigin: true,
    rewrite: () => cnbRatesUrl.pathname,
    proxyTimeout: 8000,
    timeout: 10000,
  },
}
