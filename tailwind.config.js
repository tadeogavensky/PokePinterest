/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "376px",
      },
      fontFamily: {
        heading: ["Montserrat"],
        body: ["Roboto"],
        pokemon: ["Pokemon Solid"],
      },
    },
  },
  plugins: [],
};
