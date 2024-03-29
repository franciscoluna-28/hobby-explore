/// <reference types="vitest" />
/// <reference types="Vite/client" />


import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ['dotenv/config'],
    environment: 'jsdom',
    globals: true
  },
})