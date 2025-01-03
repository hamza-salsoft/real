module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        // mulish: ["Mulish", "sans-serif"],
        // urban: ["Urbanist", "sans-serif"],
        // tavi: ["Taviraj", "serif"],
      },
      // screens: {
      //   tablet: "992px", // Custom tablet breakpoint
      //   laptop: "1400px", // Custom laptop breakpoint
      //   desktop: "1700px", // Custom desktop breakpoint
      // },
      // colors: {
      //   customGold: "#D7B65D",
      //   customBlack: "#192026",
      //   customGray: "#3F5263",
      //   customLightGray: "#74747E",
      //   customYellow: "#FCF3E6",
      // },
      // backgroundImage: (theme) => ({
      //   button:
      //     "linear-gradient(180deg, rgba(215,182,93,1) 0%, rgba(167,124,7,1) 100%)",
      // }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
