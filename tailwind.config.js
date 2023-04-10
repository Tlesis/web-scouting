/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'active': '#1d4ed8',
        'inactive': '#374151',
        'w': '#ffffff'
        // 'app-background': '#0f172a'
      }
    },
  },
  plugins: [],
}

