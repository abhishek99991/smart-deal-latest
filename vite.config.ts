import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  server: {
    host: '0.0.0.0', // Binds to all network interfaces
    port: 5173, // You can change the port if needed
  },
});
