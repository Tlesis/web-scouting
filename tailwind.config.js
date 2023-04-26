/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                // https://coolors.co/0d1117-2b303a-69788c-9f1239-f3f4f6
                "primary": "#2b303a",
                "secondary": "#0D1117",
                "active": "#9f1239",
                "inactive": "#2b303a", // subject to change
                "w": "#f3f4f6",
                "ground": "#8b97a7"
            }
        }
    },
    plugins: []
};
