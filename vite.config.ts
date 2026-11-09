import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { CNB_RATES_URL } from './src/api/cnbSource.ts'

const cnbRatesUrl = new URL(CNB_RATES_URL)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api/rates$': {
        target: cnbRatesUrl.origin,
        changeOrigin: true,
        rewrite: () => cnbRatesUrl.pathname,
        proxyTimeout: 8000,
        timeout: 10000,
      },
    },
  },
})
