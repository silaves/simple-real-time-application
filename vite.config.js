import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import * as path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server:{
      host: true,
      port: Number(env.VITE_PORT)
    }
  }
})