import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './emails/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1512',
        sand: '#f8f2ed',
        rose: '#f6d7d0',
        blush: '#f4c5c0',
        gold: '#c9a16b',
        deep: '#2b1f1a'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(201, 161, 107, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
