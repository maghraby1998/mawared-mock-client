/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#4A55A2",
        "secondary-color": "#7895CB",
      },
    },
  },
  plugins: [],
};
