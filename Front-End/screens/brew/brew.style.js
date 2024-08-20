import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.beige,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
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
    fontSize: SIZES.medium,
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
  dataContainer: {
    width: width * 0.8,
    height: height * 0.07,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: COLORS.darkBeige,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "flex-start", // Center vertically
    alignItems: "stretch",
    paddingVertical: 1,
  },
  contentContainer: {
    paddingVertical: 5,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.primary,
  },
  description: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
  },
  stopButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 40,
  },
  stopButton: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.red,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  stopButtonText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
  },
  pauseButton: {
    backgroundColor: COLORS.darkOrange,
    borderColor: COLORS.darkOrange,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  pauseButtonText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
  },
});

export default styles;
