import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 1,
    textAlign: "center",
  },
  instructions: {
    fontFamily: FONT.bold,
    fontSize: SIZES.mediumLarge,
    color: COLORS.primary,
    marginTop: SIZES.large,
    textAlign: "left",
  },
  returnButton: {
    position: "absolute",
    top: 5,
    left: 5,
    padding: 5,
    zIndex: 1,
  },
  returnButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.darkOrange,
  },
  // timeLineContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: COLORS.beige,
  // },
  contentContainer: {
    paddingVertical: 20,
  },
  itemContainer: {
    width: width * 0.8,
    height: height * 0.2,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  // line: {
  //   position: "absolute",
  //   left: 0,
  //   top: "50%",
  //   height: 2,
  //   width: "100%",
  //   backgroundColor: "#ddd",
  // },
  // circle: {
  //   position: "absolute",
  //   left: -10,
  //   top: "50%",
  //   marginTop: -10,
  //   width: 20,
  //   height: 20,
  //   borderRadius: 10,
  //   backgroundColor: "#3498db",
  //   borderColor: "#fff",
  //   borderWidth: 2,
  // },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default styles;
