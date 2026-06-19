/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F2742C",
          "orange-dark": "#D85A30",
          "dark-base": "#0D0D0D",
          "dark-card": "#1A1A1A",
          "dark-border": "#262626",
          "dark-hover": "#222222",
        },
        status: {
          pending: "#D85A30",
          preparation: "#EF9F27",
          ready: "#639922",
          delivered: "#5F5E5A",
        }
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
}

