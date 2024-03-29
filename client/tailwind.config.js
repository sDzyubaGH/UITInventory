/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: "rgba(28, 30, 46, 1)",
      },
      fontFamily: {
        myFont: ["Geologica", "Play", "Roboto"],
      },
      screens: {
        uw: "2900px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
