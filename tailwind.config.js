/** @type {import('tailwindcss').Config} */
// import PrimeUI from 'tailwindcss-primeui';
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'm-sm': '320px',
      'm-md': '360px',
      'm-lg': '600px',
      'sm': '768px',
      'md': '960px',
      'lg': '1280px',
      'xl': '1440px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          danger: 'var(--primary-danger)',
          light: 'var(--primary-light)',
          lighter: 'var(--primary-lighter)',
          hover: 'var(--primary-hover)',
        },
        'p-text': 'var(--p-text)',
        'p-text-2': 'var(--p-text-2)',
        'hs-text': 'var(--hs-text)',
        's-text': 'var(--s-text)',
        'success': 'var(--success)',
        'success-bg': 'var(--success-bg)',
        screen: 'var(--screen)',
        white: 'var(--white)',
        'star-bg': 'var(--star-bg)',
        stroke: {
          DEFAULT: 'var(--stroke)',
          heavy: {
            DEFAULT: 'var(--h-stroke)',
            100: 'color-mix(in srgb, var(--h-stroke) 10%, white)',
            200: 'color-mix(in srgb, var(--h-stroke) 20%, white)',
            300: 'color-mix(in srgb, var(--h-stroke) 30%, white)',
            400: 'color-mix(in srgb, var(--h-stroke) 40%, white)',
            500: 'var(--h-stroke)',
          }
        },
        hover: 'var(--hover)',
        't-header': 'var(--t-header)',
      },
      fontFamily: {
        RLight: ['Roboto-Light'],
        RRegular: ['Roboto-Regular'],
        RMedium: ['Roboto-Medium'],
        RSemiBold: ['Roboto-SemiBold'],
        RBold: ['Roboto-Bold'],
        RExtraBold: ['Roboto-ExtraBold'],
        CLight: ['Cairo-Light'],
        CRegular: ['Cairo-Regular'],
        CMedium: ['Cairo-Medium'],
        CSemiBold: ['Cairo-SemiBold'],
        CBold: ['Cairo-Bold'],
        CExtraBold: ['Cairo-ExtraBold'],
        roboto: ['"Roboto"', 'sans-serif'],
        cairo: ['"Cairo"', 'sans-serif'],
      },
    },
  },
  plugins: [], // PrimeUI
}
