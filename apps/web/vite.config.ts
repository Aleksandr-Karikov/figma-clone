import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@figma-clone/core': path.resolve(__dirname, '../../packages/core/src'),
      '@figma-clone/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@figma-clone/store': path.resolve(__dirname, '../../packages/store/src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});

