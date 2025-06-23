/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Adjust according to your project structure
    './index.html',  // If you have an HTML file outside src
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1280px', // you can customize breakpoints as needed
      },
    },
  },
  plugins: [],
}
