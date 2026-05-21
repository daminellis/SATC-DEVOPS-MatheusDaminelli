import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: ['.app.devops-satc.online'],
  },
})
