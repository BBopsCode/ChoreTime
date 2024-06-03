import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',  // Ensure the build output is in the dist directory
    rollupOptions: {
      external: [
        '/chore-time/src/main.js'  // Add this line to mark the module as external
      ]
    }
  },
  base: '/chore-time/'  // Set the base to the subdirectory
})
