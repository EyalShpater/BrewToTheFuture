import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.beige,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 1,
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  instructions: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginTop: SIZES.large,
    textAlign: "left",
  },
  dotsInstructions: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: "#872341s",
    marginTop: SIZES.medium,
    textAlign: "center",
  },
  emptyChartMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.mediumLarge,
    color: "red",
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
  chartContainer: {
    width: screenWidth - 30,
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: COLORS.gray3,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontFamily: FONT.bold,
    fontSize: FONT.mediumLarge,
    color: COLORS.black,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.white,
  },
});

export default styles;
