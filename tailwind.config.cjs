/** @type {import('tailwindcss').Config} */
// import defaultTheme from 'tailwindcss/defaultTheme'

// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blanc: '#FDFDFD',
        shinishi: '#787878',
        pretu: {
          DEFAULT: '#151515',
          900: "#0A0A0A",
          800: "#151515",
          700: "#1F1F1F",  
          600: "#292929",  
          500: "#333333",  
          400: "#3D3D3D",  
          300: "#474747",
          200: "#525252",  
          100: "#5C5C5C",
        },
        'pretu-lighter': '#232323',
        oranjo: {
          DEFAULT: '#F26D21',
          900: '#AE460A',
          800: '#C14E0B',
          700: '#D456OC',
          600: '#E75DOD',
          500: '#F26818',
          400: '#F4813E',
          300: '#F58D51',
          200: '#F69A65',
          100: '#F7A778',
        },
        'oranjo-blanc': '#FF9C27', 
      },     
      fontFamily: {
        'primary': [
          'League Spartan',
        ]
      },
      opacity: {
        '90': '0.9'
      },
      boxShadow: {
        'wega-nav': '0rem -3.5rem 1.5rem 5rem #151515',
        'primary-button': '0px 10.74153px 16.52542px 0px rgba(0, 0, 0, 0.30)'
      },
      animation: {
        'rotate-orbs': 'rotate-orbs 10s linear 5s infinite',
      },
      keyframes: {
        'rotate-orbs': {
          'from': { 	transform: "rotate(0deg) translateX(100px) rotate(360deg)" },
          'to':   {  transform: "rotate(360deg) translateX(100px) rotate(0deg)" }
        }
      },
      transitionProperty: {
        'wega-nav': 'translate 500ms ease-out 60ms',
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