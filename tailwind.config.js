/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './node_modules/@snowind/**/*.{vue,js,ts}',
  ],
  darkMode: 'class',
  plugins: [
    '@tailwindcss/forms',
    '@snowind/plugin',
    'tailwindcss-semantic-colors',
    'tailwindcss-primeui'
  ]
}
