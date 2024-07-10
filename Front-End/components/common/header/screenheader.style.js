import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    //backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  menuContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker background color
    justifyContent: "center",
    alignItems: "flex-start", // Align to the left side
  },
  menu: {
    backgroundColor: COLORS.menuColor,
    alignSelf: "flex-start",
    justifyContent: "flex-end",
    paddingVertical: 350,
    minHeight: windowHeight,
  },

  menuText: {
    textAlign: "center",
    marginVertical: 8, // Add vertical margin between menu items
    borderWidth: 1, // Add border
    borderColor: COLORS.black, // Border color
    borderRadius: 5, // Border radius
    padding: 10, // Add padding inside the border
  },
});

export default styles;
