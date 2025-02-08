import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.join(__dirname, 'demo'),
  build: {
    target: 'es2022',
  },
  test: {
    include: ['../src/**/*.test.ts'],
  },
});
