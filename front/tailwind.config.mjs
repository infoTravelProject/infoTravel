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
        'it-blue-dark': "#004390",
        'it-amber': "#E06F1F",
        'it-amber-light': "#AB4D1F",
        'it-grey': "#1E1E1E",
        'it-red': "#7E1C1C",
        'it-red-light': "#cc1e1e",
        "visa-free": "#28a745",
        "visa-required": "#dc3545",
        "visa-on-arrival": "#ffc107",
        "evisa": "#17a2b8",
        "freedom-of-movement": "#007bff",
        "admission-refused": "#6c757d",
        "other-requirements": "#6610f2",
        "unknown": "#343a40",
        "it-background": "#121212",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        BraahOne: ['Braah One', 'sans-serif'],
      },
      backgroundImage: {
        'it-gradient': 'linear-gradient(to bottom, rgba(31, 144, 224, 0.12) 0%, rgba(40, 80, 140, 0.1) 25%, rgba(50, 50, 100, 0.06) 50%, rgba(20, 20, 50, 0.03) 75%, rgba(0, 0, 0, 0) 100%)',
        'it-airport': "url('/airport.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
