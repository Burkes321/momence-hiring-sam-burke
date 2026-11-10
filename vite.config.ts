import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VITE_PROXY_OPTIONS } from './const.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: VITE_PROXY_OPTIONS,
  },
})
