import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const iframeHeaders = {
  // Allow embedding in iframes on any origin (no X-Frame-Options: DENY)
  'Content-Security-Policy': 'frame-ancestors *',
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    headers: iframeHeaders,
  },
  preview: {
    port: 5173,
    host: true,
    headers: iframeHeaders,
  },
})
