import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/atom-ui/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['atomicuilibrary']
  },
  server: {
    fs: {
      allow: [
        '..',
        'P:/Repository/stenciljs/atomicUILibrary'
      ]
    }
  }
})
