/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'upperScore': "url(./rapidReactUpperScore.png)"
      }
    },
  },
  plugins: [],
}

