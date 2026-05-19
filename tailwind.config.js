/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        body:    ['Outfit', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        violet: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        surface: {
          50:  '#F8F8FF',
          900: '#0C0C1A',
          950: '#080813',
          1000:'#04040A',
        },
      },
      animation: {
        'float':        'float-y 6s ease-in-out infinite',
        'float-slow':   'float-y 8s ease-in-out infinite 1s',
        'spin-slow':    'rotate-slow 20s linear infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'pulse-ring':   'pulse-ring 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'fade-up':      'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        'float-y':    { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-16px)' } },
        'rotate-slow':{ from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        'pulse-ring':  { '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(124,58,237,0.4)' }, '70%': { transform: 'scale(1)', boxShadow: '0 0 0 20px rgba(124,58,237,0)' }, '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(124,58,237,0)' } },
        fadeUp:       { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
