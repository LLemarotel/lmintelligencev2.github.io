/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#000099',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],

  
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Background colors
    'bg-blue-50', 'bg-blue-100', 'dark:bg-blue-900/20',
    'bg-green-50', 'bg-green-100', 'dark:bg-green-900/20',
    'bg-purple-50', 'bg-purple-100', 'dark:bg-purple-900/20',
    'bg-red-50', 'bg-red-100', 'dark:bg-red-900/20',
    // Text colors
    'text-blue-800', 'text-blue-200',
    'text-green-800', 'text-green-200',
    'text-purple-800', 'text-purple-200',
    'text-red-800', 'text-red-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}