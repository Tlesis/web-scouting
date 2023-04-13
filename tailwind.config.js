/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'active': '#1d4ed8',
        'inactive': '#374151',
        'w': '#f3f4f6'
        // 'app-background': '#0f172a'
      }
    },
  },
  plugins: [],
}

