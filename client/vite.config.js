/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import path from 'path';
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv';
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: Number(process.env.APP_SERVER_PORT),
    strictPort: true,
  },
  plugins: [
    react(),
    Inspect()
  ],
  resolve:{
    alias: {
      '@public': path.resolve(__dirname, './public'),
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets')

    }
  },
  /*
  якщо сторінка багатосторінкова треба тут перечисляти сторінки які будуть білдитись
  build:{
    rollupOptions:{
      input:{
        main: path.resolve(__dirname,"index.html"),
        login: path.resolve(__dirname,"login.html"),
      }
    }
  }
    */
  envPrefix: 'APP_',
})
