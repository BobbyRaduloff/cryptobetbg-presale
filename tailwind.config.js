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
        vred: "#ed1d49",
        vpurple: "#540D6E",
        vwhite: "#F5F0F6",
        vblack: "#131200",
        vyellow: "#F9C80E",
        vgray: "#272626",
        vbetgray: "#262E42",
        vstolenpurple: "#a162de",
        vstolenblue: "#6255F4",
        vstolenorange: "#EE9554",
      },
      fontFamily: {
        vice: ["Vice"],
        outrun: ["GraveSnatchers"],
        akira: ["Akira"],
        tommy: ["Tommy"],
      },
    },
  },
  plugins: [],
};
