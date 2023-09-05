import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
  
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
