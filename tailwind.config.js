/** @type {import('tailwindcss').Config} */

function withOpacityValue(variable) {
  return `hsl(var(${variable}))`;
}

module.exports = {
  content: [
    "./src/**/*.{html,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'base-l-300': `hsl(var(--base-l-300))`,
        'base-l-200': `hsl(var(--base-l-200))`,
        'base-l-100': `hsl(var(--base-l-100))`,
        'base': `hsl(var(--base))`,
        'base-400': `hsl(var(--base-400))`,
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
              {
                nocturn: {
                  'primary': '#0c2461',
                  'primary-focus': '#091B49',
                  'primary-content': '#ecf0f1',
                  'secondary': '#15803d',
                  'secondary-focus': '#0F5F2E',
                  'secondary-content': '#ecf0f1',
                  'accent': '#d35400',
                  'accent-focus': '#C2410B',
                  'accent-content': '#ecf0f1',
                  'neutral': '#1e3a8a',
                  'neutral-focus': '#1A3275',
                  'neutral-content': '#ecf0f1',
                  '--base-l-300': '209 29% 36%',
                  '--base-l-200': '209 29% 32%',
                  '--base-l-100': '211 29% 28%',
                  '--base': '210 29% 24%',
                  'base-100': '#243342',
                  'base-200': '#1D2935',
                  'base-300': '#161F27',
                  '--base-400': '210 30% 8%',
                  'base-content': '#ecf0f1',
                  'info': '#2A7EB7',
                  'info-content': '#0F2E43',
                  'success': '#16a34a',
                  'success-content': '#0A483B',
                  'warning': '#facc15',
                  'warning-content': '#4B3A0A',
                  'error': '#A81036',
                  'error-content': '#ecf0f1',
                },
                aurora: {
                  'primary': '#3498db',
                  'primary-focus': '#2980b9',
                  'primary-content': '#2c3e50',
                  'secondary': '#1abc9c',
                  'secondary-focus': '#16a085',
                  'secondary-content': '#2c3e50',
                  'accent': '#e67e22',
                  'accent-focus': '#d35400',
                  'accent-content': '#2c3e50',
                  'neutral': '#34495e',
                  'neutral-focus': '#2c3e50',
                  'neutral-content': '#DCE3E5',
                  '--base-l-300': '#ffffff',
                  '--base-l-200': '180 33% 99%',
                  '--base-l-100': '180 14% 99%',
                  '--base': '180 12% 97%',
                  'base-100': '#ecf0f1',
                  'base-200': '#E8ECEE',
                  'base-300': '#DCE3E5',
                  '--base-400': '190 15% 84%',
                  'base-content': '#2c3e50',
                  'info': '#8e44ad',
                  'info-content': '#ecf0f1',
                  'success': '#27ae60',
                  'success-content': '#ecf0f1',
                  'warning': '#f1c40f',
                  'warning-content': '#4B3A0A',
                  'error': '#c0392b',
                  'error-content': '#ecf0f1',
                }

             },
    ],
  },
}



