/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat"],
        body: ["Roboto"],
        pokemon: ["Pokemon Solid"]
      },
    },
  },
  plugins: [],
};
