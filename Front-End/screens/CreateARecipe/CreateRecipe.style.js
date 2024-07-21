import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  instructions: {
    fontFamily: FONT.bold,
    fontSize: SIZES.mediumLarge,
    color: COLORS.primary,
    marginTop: SIZES.large,
    textAlign: "center",
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 1,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  pickerInputContainer: {
    flex: 1,
    height: 32,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.gray3,
  },
  label: {
    fontFamily: FONT.bold,
    fontSize: SIZES.smallMedium,
    color: COLORS.primary,
    marginRight: 10,
    width: "40%",
  },
  input: {
    flex: 1,
    height: 32,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.gray3,
    textAlign: "center",
  },
  pickerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  picker: {
    height: 200,
    width: "100%",
  },
  ingredientTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: 10,
  },
  stepContainer: {
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  fieldLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginRight: 10,
    width: "40%",
  },
  stepInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  stepFieldsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  nextPageButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 50,
  },
  saveRecipeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  nextPageButtonText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
  },
  AddStepButton: {
    backgroundColor: COLORS.gray3,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  AddStepButtonText: {
    color: COLORS.primary,
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
  },
  stepContainer: {
    marginBottom: 20, // adjust as needed for spacing
  },
  underlineText: {
    textDecorationLine: "underline",
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
});

export default styles;
