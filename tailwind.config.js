/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        forest: {
          DEFAULT: '#173F2B',
          50: '#F2F7F4',
          100: '#E1EFE8',
          200: '#C2DFD1',
          300: '#94C6AE',
          400: '#5EA783',
          500: '#3A8862',
          600: '#266D4C',
          700: '#1C543B',
          800: '#173F2B', // Primary forest green
          900: '#102D20', // Deep green
          950: '#081711',
        },
        cream: {
          DEFAULT: '#F8F5EC',
          50: '#FDFCF9',
          100: '#FAF8F2',
          200: '#F8F5EC', // Warm cream
          300: '#EFE9D7',
          400: '#E8DDC7', // Natural beige
          500: '#D5C3A1',
        },
        gold: {
          DEFAULT: '#C89A45',
          light: '#DEB668',
          dark: '#A67B2E',
        },
        beige: '#E8DDC7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
