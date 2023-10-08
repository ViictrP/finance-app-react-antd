import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), EnvironmentPlugin('all')],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
