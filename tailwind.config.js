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
        700: '#345048',
        100: '#00DDB4', // light
      },
      purple: {
        DEFAULT: '#9747FF',
      },
      pink: {
        DEFAULT: '#E75595',
        700: '#7D4B93',
      },
      blue: {
        DEFAULT: '#47BEFF',
      },
      orange: {
        DEFAULT: '#FE872F',
      },
      yellow: {
        DEFAULT: '#FEC42F',
      },
      magenta: {
        DEFAULT: '#D355E7',
        700: '#7D4B93',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      gray: {
        900: '#13191B', // almost_black
        950: '#232a30',
        800: '#293139', // darker
        700: '#333D46', // dark
        600: '#42525C', // dark_mid
        400: '#91abbc',
        300: '#818D95', // mid
        200: '#C5D0D5',
        100: '#B0C0C8', //light
      },
    },
    extend: {
      borderWidth: {
        3: '3px',
      },
      fontFamily: {
        sans: ['SofiaPro', 'sans-serif'],
      },
      backdropBlur: {
        md: '10px',
      },
      opacity: {
        15: '0.15',
      },
      maxWidth: {
        14: '3.5rem',
      },
      minWidth: {
        '1/2': '50%',
      },
      width: {
        30: '7.5rem',
      },
      fontSize: {
        '1xs': '0.625rem',
        '2xs': '0.5rem',
      },
      spacing: {
        15: '3.75rem',
        0.75: '0.1875rem',
        8.5: '2.125rem',
        4.5: '1.125rem',
      },
    },
  },
  plugins: [],
}
