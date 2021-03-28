module.exports = {
  purge: {
    content: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"],
  },
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
      },
      fontFamily: {
        inter: '"Inter"',
      },
      colors: {
        gunsmoke: {
          50: "#F9F9F9",
          100: "#F3F3F3",
          200: "#E1E1E1",
          300: "#CFCFCF",
          400: "#ACACAC",
          500: "#888888",
          600: "#7A7A7A",
          700: "#525252",
          800: "#3D3D3D",
          900: "#292929",
        },
        blue: {
          100: "#E6E6FF",
          200: "#BFBFFF",
          300: "#9999FF",
          400: "#4D4DFF",
          500: "#0000FF",
          600: "#0000E6",
          700: "#000099",
          800: "#000073",
          900: "#00004D",
        },
      },
      spacing: {
        "25vh": "25vh",
        "33vh": "33.34vh",
        "66vh": "66.66vh",
        "50vh": "50vh",
        "75vh": "75vh",
      },
      minHeight: {
        64: "16rem",
        96: "24rem",
        128: "32rem",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
