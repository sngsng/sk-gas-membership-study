const px0_1000 = { ...Array.from(Array(1000)).map((_, i) => `${i}px`) };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: px0_1000,
      fontWidth: px0_1000,
      lineHeight: px0_1000,
      width: px0_1000,
      height: px0_1000,
      maxWidth: px0_1000,
      minWidth: px0_1000,
      maxHeight: px0_1000,
      minHeight: px0_1000,
      spacing: px0_1000,
      borderWidth: px0_1000,
      margin: px0_1000,
      padding: px0_1000,
      fontSize: {
        h1: [
          "24px",
          {
            lineHeight: "27px",
            fontWeight: "800",
          },
        ],
        h2: [
          "20px",
          {
            lineHeight: "23px",
            fontWeight: "700",
          },
        ],
        h3: [
          "18px",
          {
            lineHeight: "20px",
            fontWeight: "700",
          },
        ],
        b1: [
          "16px",
          {
            lineHeight: "18px",
            fontWeight: "400",
          },
        ],
        b2: [
          "14px",
          {
            lineHeight: "22px",
            fontWeight: "400",
          },
        ],
        b3: [
          "12px",
          {
            lineHeight: "20px",
            fontWeight: "300",
          },
        ],
        p: [
          "10px",
          {
            lineHeight: "16px",
            fontWeight: "400",
          },
        ],
      },
      colors: {
        blue: "#3882f6",
        lightBlue: "#319cff",
        navy: "#2F5FAB",
        red: "#ff334b",
        green: "#219653",
        yellow: "#f2c94c",
        white: "#ffffff",
        gray100: "#fcfcfc",
        gray150: "#f5f5f5",
        gray200: "#efefef",
        gray250: "#e8e8e8",
        gray300: "#dfdfdf",
        gray350: "#c8c8c8",
        gray400: "#b7b7b7",
        gray500: "#949494",
        gray600: "#777777",
        gray650: "#616161",
        gray700: "#3f3f3f",
        gray750: "#3f3f3f",
        gray770: "#383838",
        gray800: "#2a2a2a",
        gray850: "#1f1f1f",
        gray870: "#1a1a1a",
        gray900: "#111111",
        black: "#000000",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
