/** @type {import('tailwindcss').Config} */

// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blanc: '#FDFDFD',
        shinishi: '#787878',
        pretu: '#151515',
        oranjo: '#F26D21',
        oranjoBlanc: '#FF9C27', 
      },     
      fontFamily:{
        'primary': ['League Spartan', 'Poppins']
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '20px' 
      }
    }
  },
  darkMode: 'class',
  plugins: [],
}