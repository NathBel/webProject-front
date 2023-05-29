/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
      extend: {
        colors: {
            "blue-primary": "#009AF1",
            "secondary": "#A2CEF2",
            "tertiary": "#004166",
            "quaternary": "#A2CEF2",
            "header-footer": "rgba(84, 84, 84, 0.6)",
            "search-area": "rgba(246, 246, 246, 0.8)",
        },
        fontFamily: {
            DMsans: ["DM Sans, sans-serif"],
        },
        backgroundImage: {
            'locate-bg': "url('/bg-img/loctae_homepage.jpg')",
            'footer-texture': "url('/img/footer-texture.png')",
        }
      },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")]
  }
