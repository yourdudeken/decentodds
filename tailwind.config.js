/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3eeff',
          100: '#e5ddff',
          200: '#cbbeff',
          300: '#ae96ff',
          400: '#9066ff',
          500: '#7c3aff',
          600: '#6E22C9', // Main primary color
          700: '#5a18a8',
          800: '#4c1689',
          900: '#3f1670',
        },
        secondary: {
          50: '#ecfefe',
          100: '#cbfdfa',
          200: '#9af7f3',
          300: '#64ebe8',
          400: '#31d8d8',
          500: '#22C9A7', // Main secondary color
          600: '#149a8d',
          700: '#147b76',
          800: '#166261',
          900: '#185251',
        },
        accent: {
          50: '#fff9eb',
          100: '#fef0c7',
          200: '#fddf8a',
          300: '#fbc74c',
          400: '#F59E0B', // Main accent color
          500: '#f18805',
          600: '#d96a02',
          700: '#b44c06',
          800: '#933b0c',
          900: '#79320e',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80', // Main success color
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24', // Main warning color
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Main error color
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // Main background color
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'crypto-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMEMyMy40IDAgMTguMiA1LjIgMTguMiAxMS44YzAgNS40IDMuNiA5LjkgOC41IDExLjR2NC4zSDMwdjQuM2gtMy4ydjQuM0gzMHY0LjNoLTMuMnY0LjNIMzB2MTUuNGM2LjYgMCAxMS44LTUuMiAxMS44LTExLjhjMC01LjQtMy42LTkuOS04LjUtMTEuNFYzMi4xSDMwdi00LjNoMy4ydi00LjNIMzB2LTQuM2gzLjJ2LTQuM0gzMFYweiIgZmlsbD0icmdiYSgxMTAsMTEwLDExMCwwLjA1KSIvPjwvc3ZnPg==')",
      },
    },
  },
  plugins: [],
};