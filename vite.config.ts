//plugins
import vue from '@vitejs/plugin-vue';
import ViteFonts from 'unplugin-fonts/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const url = new URL('./src', import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      imports: ['vue'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(url),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  define: { 'process.env': {} },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          @import "${url}/assets/app.css";`,
      },
    },
  },
});
