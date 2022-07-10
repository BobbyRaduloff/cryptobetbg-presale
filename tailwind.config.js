/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vblue: "#556DC8",
        vorange: "#FF6C11",
        vpink: "#D40078",
        vpurple: "#540D6E",
        vwhite: "#F5F0F6",
        vblack: "#131200",
        vyellow: "#F9C80E",
      },
      fontFamily: {
        vice: ["Vice"],
        outrun: ["GraveSnatchers"],
      },
    },
  },
  plugins: [],
};
