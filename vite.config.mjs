import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.join(__dirname, 'demo'),
  server: {
    host: '127.0.0.1', // see https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
  },
  build: {
    target: 'es2022',
  },
  test: {
    include: ['../src/**/*.test.ts'],
    environment: 'jsdom',
  },
});
