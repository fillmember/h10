module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"],
  },
  theme: {
    extend: {
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
  plugins: [],
};
