import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

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
    top: 54,
    left: 5,
    padding: 5,
    zIndex: 1,
  },
  returnButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.darkOrange,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: "#ccc",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#ccc",
  },
  nameHeader: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginLeft: 22,
  },
  dateHeader: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  actionHeader: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginRight: 22,
  },
  nameContainer: {
    flexGrow: 1,
  },
  recipeName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.buttonBlue,
  },
  date: {
    fontSize: SIZES.medium,
    color: COLORS.date,
    marginLeft: 20,
    marginRight: 20,
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
  playButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 40,
  },
  playButtonText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
  },
  underlineText: {
    textDecorationLine: "underline",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 40,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
  },
  loadingText: {
    fontSize: SIZES.mediumLarge,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: SIZES.xLarge,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
  emptyTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.beige,
  },
});

export default styles;
