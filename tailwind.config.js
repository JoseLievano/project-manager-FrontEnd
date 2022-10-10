/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
              {
                nocturn: {
                  "primary": "#0c2461",
                  "secondary": "#15803d",
                  "accent": "#ea580c",
                  "neutral": "#1e3a8a",
                  "base-100": "#2c3e50",
                  "info": "#93BEE1",
                  "success": "#16a34a",
                  "warning": "#facc15",
                  "error": "#be123c",
                  "primary-content": "#ecf0f1",
                  "secondary-content": "#2c3e50",
                }
             },
    ],
  },
}
