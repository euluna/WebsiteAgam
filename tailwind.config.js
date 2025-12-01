module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'black-cherry': {
          50: '#fce8e8',
          100: '#fad1d1',
          200: '#f5a3a3',
          300: '#f07575',
          400: '#eb4747',
          500: '#e61919',
          600: '#b81414',
          700: '#8a0f0f',
          800: '#5c0a0a',
          900: '#2e0505',
          950: '#200404'
        },
        'chocolate': {
          50: '#fdf0e7',
          100: '#fbe2d0',
          200: '#f8c5a0',
          300: '#f4a871',
          400: '#f18a41',
          500: '#ed6d12',
          600: '#be570e',
          700: '#8e420b',
          800: '#5f2c07',
          900: '#2f1604',
          950: '#210f02'
        },
        'sand-dune': {
          50: '#f7f4ed',
          100: '#f0e9db',
          200: '#e1d3b7',
          300: '#d2bd93',
          400: '#c3a76f',
          500: '#b4914b',
          600: '#90743c',
          700: '#6c572d',
          800: '#483a1e',
          900: '#241d0f',
          950: '#19140b'
        },
        'dark-coffee': {
          50: '#f8f1ec',
          100: '#f1e3da',
          200: '#e4c7b4',
          300: '#d6ab8f',
          400: '#c98f69',
          500: '#bb7444',
          600: '#965c36',
          700: '#704529',
          800: '#4b2e1b',
          900: '#25170e',
          950: '#1a1009'
        },
        'old-gold': {
          50: '#fbf7ea',
          100: '#f7eed4',
          200: '#eeddaa',
          300: '#e6cc7f',
          400: '#ddbb55',
          500: '#d5aa2a',
          600: '#aa8822',
          700: '#806619',
          800: '#554411',
          900: '#2b2208',
          950: '#1e1806'
        },
        // token aliases for convenience (updated to a darker maroon primary)
        primary: {
          DEFAULT: '#7b1f1f', // brighter maroon (more red)
          '600': '#5a1414'
        },
        secondary: {
          DEFAULT: '#b85a2a' // warm, muted complementary tone
        },
        accent: {
          DEFAULT: '#d5aa2a' // gold accent retained for highlights
        },
        neutral: {
          DEFAULT: '#f3f4f6' // light neutral for panels/backgrounds
        }
      }
    },
  },
  plugins: [],
}
