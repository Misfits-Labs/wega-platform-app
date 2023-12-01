import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log(mode)
  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    // server: { https: true },
    build: {
      outDir: "./dist", 
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
    },
    esbuild: {
      // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    plugins: [
      react({
        babel: {
          plugins: ['babel-plugin-macros', 'babel-plugin-styled-components']
        }
      }),
    ],
  })
  
}
