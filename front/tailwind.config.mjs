/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'it-blue': "#1F90E0",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        BraahOne: ['Braah One', 'sans-serif'],
      },
      backgroundImage: {
        'it-gradient': 'linear-gradient(to bottom, rgba(31, 144, 224, 0.12) 0%, rgba(40, 80, 140, 0.1) 25%, rgba(50, 50, 100, 0.06) 50%, rgba(20, 20, 50, 0.03) 75%, rgba(0, 0, 0, 0) 100%)',
      },
    },
  },
  plugins: [],
};
