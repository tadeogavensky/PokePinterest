import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":"https://poke-pinterest-4610kuu9i-tadeogavensky1.vercel.app"
    }
  }
})
