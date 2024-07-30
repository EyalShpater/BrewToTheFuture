const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#ED9455",
  darkOrange: "#D77948",

  gray: "#83829A",
  gray2: "#C1C0C8",
  gray3: "#E5E1DA",
  date: "#888",

  white: "#F3F4F8",
  black: "#0C0C0C",
  lightWhite: "#FAFAFC",
  backGround: "#F1F1F1",
  backGround2: "#D6E8DB",

  lightOrange: "#FFCF9D",
  yellow: "#FFEEA9",
  beige: "#EDE4E0",
  darkBeige: "#D4C8C3",
  transparent: "#rgba(0, 0, 0, 0.5)",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  smallMedium: 14,
  medium: 16,
  mediumLarge: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
