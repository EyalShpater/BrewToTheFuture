import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  barContainer: {
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "lightgray",
    borderRadius: 20,
    marginVertical: 10,
  },
  bar: {
    height: "100%",
    borderRadius: 20,
  },
  temperatureTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  temperatureText: {
    color: COLORS.white,
    fontSize: SIZES.mediumLarge,
    fontWeight: "bold",
  },
});

export default styles;
