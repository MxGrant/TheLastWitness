import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * In cloud previews the app is served behind a per-chat hostname. Only the
 * exact hostname supplied by the environment is allowed; no wildcard hosts.
 */
const previewHost = process.env.PREVIEW_HOST;

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: previewHost ? [previewHost] : undefined,
  },
});
