/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      asphalt: {
        DEFAULT: '#1A2026',
      },
      neon: {
        DEFAULT: '#4CFFB3',
      },
      green: {
        DEFAULT: '#2EBE81',
        light: '#00DDB4',
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
      grey: {
        black: '#13191B',
        darker: '#293139',
        dark: '#333D46',
        mid: '#818D95',
        light: '#B0C0C8',
      },
    },
    extend: {
      fontFamily: {
        sans: ['SofiaPro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
