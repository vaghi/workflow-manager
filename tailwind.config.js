/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '13': '13px',
        '30': '30px',
      },
      spacing: {
        '13': '13px',
        'search': '198.74px',
        'sidebar-header-w': '206px',
        'sidebar-header-h': '92px',
        'modal-w': '500px',
      },
      colors: {
        'stroke-primary': 'var(--Colors-Stroke-Primary, #ECEDEF)',
        'text-secondary': 'var(--Colors-Text-Secondary, #868686)',
        'text-primary': '#09090B',
        'text-tertiary': '#808593',
        'border-subtle': '#09090B14',
        'bg-subtle': '#09090B0A',
        'primary': {
          DEFAULT: '#6172F3',
          light: '#EFF1FF',
        },
        'surface-hover': '#F9FAFB',
        'sidebar-border': '#E6E6E6',
        'sidebar-icon-bg': '#ADABFF',
      },
    },
  },
  plugins: [],
}

