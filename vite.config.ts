import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  // Cast plugins to any to avoid type incompatibilities between vite/plugin versions.
  // This is a reversible, minimal change so the build can proceed. For a permanent
  // fix align @vitejs/plugin-react / vite / tailwind plugin versions in package.json.
  plugins: ([react(), tailwindcss()] as unknown) as any,
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // backend port
    },
  }
})
