/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        //Orbitron
        logo: ["Satisfy", "cursive"],
        title: ["Sora", "sans-serif"],
        //  logo: ["orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
