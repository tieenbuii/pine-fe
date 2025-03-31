/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#BF2929",
        secondary: "#FFDB00",
        tertiary :"#FFA400",
        // Quaternary, Quinary 
      },
      maxWidth:{
        containerXl: "1280px"
      },
      backgroundColor:{
        primary: "#BF2929",
        secondary: "#FFDB00",
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
