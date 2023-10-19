/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      asphalt: {
        DEFAULT: '#1A2026',
      },
      neon: {
        DEFAULT: '#4CFFB3',
      },
      green: {
        DEFAULT: '#2EBE81',
        100: '#00DDB4', // light
      },
      purple: {
        DEFAULT: '#9747FF',
      },
      pink: {
        DEFAULT: '#E75595',
      },
      blue: {
        DEFAULT: '#22B1FF',
      },
      orange: {
        DEFAULT: '#FE872F',
      },
      yellow: {
        DEFAULT: '#FEC42F',
      },
      magenta: {
        DEFAULT: '#D355E7',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      gray: {
        900: '#13191B', // almost_black
        800: '#293139', // darker
        700: '#333D46', // dark
        600: '#42525C', // dark_mid
        200: '#818D95', // mid
        100: '#B0C0C8', //light
      },
    },
    extend: {
      fontFamily: {
        sans: ['SofiaPro', 'sans-serif'],
      },
      opacity: {
        15: '0.15',
      },
      maxWidth: {
        14: '3.5rem',
      },
      width: {
        30: '7.5rem',
      },
      spacing: {
        15: '3.75rem',
      },
    },
  },
  plugins: [],
}
