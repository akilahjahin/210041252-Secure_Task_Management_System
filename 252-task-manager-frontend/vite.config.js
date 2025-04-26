// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Optional: change port if needed
    proxy: {
      '/api': 'http://localhost:5000', // Backend server URL
    },
  }
});
