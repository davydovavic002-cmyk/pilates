import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const iframeHeaders = {
  'Content-Security-Policy':
    "frame-ancestors 'self' https://neostudio.space https://*.neostudio.space http://localhost:* https://localhost:*",
}

const allowedHosts = ['pilates.neostudio.space', 'localhost']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 5173,
    host: true,
    allowedHosts,
    headers: iframeHeaders,
  },
  server: {
    host: true,
    allowedHosts,
    headers: iframeHeaders,
  },
})
