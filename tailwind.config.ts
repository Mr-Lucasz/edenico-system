import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Cores específicas dos Summary Cards - Pixel Perfect
        summary: {
          'green-dark': '#1e6e44', // Dark forest green
          'green-medium': '#15803d', // Medium green
          'orange-brown': '#92400e', // Deep brownish-orange
          'orange-medium': '#c2410c', // Medium orange
          'purple-dark': '#6b21a8', // Deep purple
          'purple-medium': '#9333ea', // Medium purple
        },
      },
    },
  },
  plugins: [],
}
export default config
