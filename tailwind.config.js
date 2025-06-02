/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,}",
  ],
  theme: {
    extend: {
      colors: {
        'color-fond':'#dfded8',
                        'color-panel':'#d5cebf',
                        'color-avant-panel':'rgba(240,240,232,255)',
                          'color-noir':'#12110f',
                          'color-gris':'#747473',
                            'color-gris-clair':'#e3e3e1',
                            'color-blanc':'#fcfcfc',
                            'color-vert':'#46c943',
                            'color-text':'#676665',
                            'color-jaune':'#e0b44b'
      }
    },
  },
  plugins: [],
}  
