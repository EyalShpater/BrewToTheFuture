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
    fontFamily: FONT.medium,
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
  label: {
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
    color: COLORS.primary,
    marginRight: 10,
    width: "40%",
  },
  input: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    paddingHorizontal: 10,
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
  fermentableTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: 10,
  },
  stepContainer: {
    marginBottom: 20,
  },
  stepTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: 5,
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
    backgroundColor: COLORS.tertiary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  AddStepButtonText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.smallMedium,
  },
  stepContainer: {
    marginBottom: 20, // adjust as needed for spacing
  },
  underlineText: {
    textDecorationLine: "underline",
  },
});

export default styles;
