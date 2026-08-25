import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true, // Enables global test methods like describe, test, expect
    environment: 'node', // or 'jsdom' if testing DOM manipulation
  },
});