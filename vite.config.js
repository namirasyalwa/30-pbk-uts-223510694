import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
<<<<<<< HEAD
=======
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
>>>>>>> d433041 (Menambahkan Framework dan State Management)
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
<<<<<<< HEAD
    vue(),
=======
    vue({
      template: {transformAssetUrls}
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
>>>>>>> d433041 (Menambahkan Framework dan State Management)
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
