const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        sidebar: '#2F2F33',
        surface: '#F4F5F7',
        'surface-dark': '#1E1E21',
        'base-content': '#1A1A1D',
        accent: '#4F46E5',
        'accent-muted': '#6366F1',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
      },
      screens: {
        xl: '1200px',
      },
    },
  },
  plugins: [],
};
