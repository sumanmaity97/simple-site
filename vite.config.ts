import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-13-233-128-152.ap-south-1.compute.amazonaws.com:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
