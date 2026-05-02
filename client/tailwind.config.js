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
        primary: {
          light: "#6366f1", // indigo-500
          DEFAULT: "#4f46e5", // indigo-600
          dark: "#4338ca", // indigo-700
        },
        secondary: {
          light: "#a855f7", // violet-500
          DEFAULT: "#9333ea", // violet-600
          dark: "#7e22ce", // violet-700
        },
        accent: {
          light: "#10b981", // emerald-500
          DEFAULT: "#059669", // emerald-600
          dark: "#047857", // emerald-700
        },
        dark: {
          bg: "#0f172a", // slate-900
          card: "rgba(30, 41, 59, 0.7)", // slate-800 with opacity for glassmorphism
          border: "#1e293b",
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

