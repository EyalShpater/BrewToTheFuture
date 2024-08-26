import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

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
    color: COLORS.darkOrange,
    marginTop: 1,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 40,
  },
  label: {
    fontFamily: FONT.bold,
    fontSize: SIZES.smallMedium,
    color: COLORS.white,
    marginRight: 10,
    width: "40%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
    maxWidth: "80%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "60%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: COLORS.date,
  },
  signInButton: {
    width: "60%",
    padding: 15,
    // backgroundColor: "#007BFF",
    backgroundColor: COLORS.beige,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  signInButtonText: {
    color: COLORS.black,
    fontSize: 16,
  },
  registerLink: {
    // color: "#007BFF",
    color: COLORS.darkOrange,
    marginTop: 20,
  },
});

export default styles;
