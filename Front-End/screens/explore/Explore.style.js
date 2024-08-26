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
    backgroundColor: COLORS.beige,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 1,
    textAlign: "center",
  },
  returnButton: {
    position: "absolute",
    top: 5,
    left: -6,
    padding: 5,
    zIndex: 1,
  },
  returnButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.darkOrange,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.transparent,
    position: "absolute",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: COLORS.gray3,
    padding: 20,
    borderRadius: 30,
  },
  modalTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    marginBottom: 16,
  },
  field: {
    fontSize: SIZES.medium,
    marginBottom: 8,
  },
  fieldLabel: {
    fontFamily: FONT.bold,
  },
  loadingText: {
    fontSize: SIZES.mediumLarge,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  dataContainer: {
    width: width * 0.8,
    height: height * 0.22,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: "#EAC196",
    borderRadius: 50,
    borderBottomEndRadius: 1,
    borderStartStartRadius: 1,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 5,
    justifyContent: "flex-start", // Center vertically
    alignItems: "stretch",
    paddingVertical: 1,
    marginBottom: 15,
  },
  recipeName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginTop: SIZES.large,
    textAlign: "center",
  },
  date: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.date,
    marginTop: SIZES.large,
    textAlign: "center",
  },
  touchOrder: {
    fontFamily: FONT.bold,
    fontSize: SIZES.smallMedium,
    color: COLORS.buttonBlue,
    marginTop: SIZES.large,
    textAlign: "center",
  },
});

export default styles;