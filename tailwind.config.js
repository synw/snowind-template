const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './node_modules/@snowind/**/*.{vue,js,ts}',
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@snowind/plugin'),
    require('tailwindcss-semantic-colors'),
    require('tailwindcss-primeui')
  ],
  theme: {
    extend: {
      semanticColors: {
        primary: {
          light: {
            bg: 'var(--primary-light-bg)',
            txt: 'var(--primary-light-txt)',
          },
          dark: {
            bg: 'var(--primary-dark-bg)',
            txt: 'var(--primary-dark-txt)',
          }
        },
        secondary: {
          light: {
            bg: 'var(--secondary-light-bg)',
            txt: 'var(--secondary-light-txt)'
          },
          dark: {
            bg: 'var(--secondary-dark-bg)',
            txt: 'var(--secondary-dark-txt)'
          }
        },
        background: {
          light: {
            bg: 'var(--background-light-bg)',
            txt: 'var(--background-light-txt)'
          },
          dark: {
            bg: 'var(--background-dark-bg)',
            txt: 'var(--background-dark-txt)'
          }
        },
        foreground: {
          light: {
            bg: 'var(--foreground-light-bg)',
            txt: 'var(--foreground-light-txt)'
          },
          dark: {
            bg: 'var(--foreground-dark-bg)',
            txt: 'var(--foreground-dark-txt)'
          }
        },
        light: {
          light: {
            bg: 'var(--light-light-bg)',
            txt: 'var(--light-light-txt)'
          },
          dark: {
            bg: 'var(--light-dark-bg)',
            txt: 'var(--light-dark-txt)'
          }
        },
        lighter: {
          light: {
            bg: 'var(--lighter-light-bg)',
            txt: 'var(--lighter-light-txt)'
          },
          dark: {
            bg: 'var(--lighter-dark-bg)',
            txt: 'var(--lighter-dark-txt)'
          }
        },
        semilight: {
          light: {
            bg: 'var(--semilight-light-bg)',
            txt: 'var(--semilight-light-txt)'
          },
          dark: {
            bg: 'var(--semilight-dark-bg)',
            txt: 'var(--semilight-dark-txt)'
          }
        },
        "secondary-strong": {
          light: {
            bg: 'var(--secondary-strong-light-bg)',
            txt: 'var(--secondary-strong-light-txt)'
          },
          dark: {
            bg: 'var(--secondary-strong-dark-bg)',
            txt: 'var(--secondary-strong-dark-txt)'
          }
        },
      }
    }
  }
}