import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const iframeHeaders = {
  // Allow embedding in iframes on any origin (no X-Frame-Options: DENY)
  'Content-Security-Policy': 'frame-ancestors *',
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
