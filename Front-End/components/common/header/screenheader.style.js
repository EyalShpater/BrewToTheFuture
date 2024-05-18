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
    backgroundColor: COLORS.lightOrange,
    alignSelf: "flex-start", // Align menu to the left
    justifyContent: "flex-end", // Align options to the bottom
    //borderTopLeftRadius: 30, // Rounded top left corner
    //borderTopRightRadius: 30, // Rounded top right corner
    //borderBottomLeftRadius: 30, // Rounded bottom left corner
    paddingVertical: 350, // Add padding
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
