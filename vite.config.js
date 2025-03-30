import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    base: '/',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      outDir: '../dist',
    },
    publicDir: '../public',
    root: './src',
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});
