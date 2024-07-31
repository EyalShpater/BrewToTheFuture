import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: 40,
//     justifyContent: "center",
//     alignItems: "flex-start",
//     backgroundColor: "lightgray",
//     borderRadius: 20,
//     marginVertical: 10,
//   },
//   bar: {
//     height: "100%",
//     borderRadius: 20,
//   },
//   temperatureText: {
//     // position: "static",
//     color: COLORS.white,
//     fontWeight: "bold",
//     bottom: -10, // Adjust this value to position the text lower
//   },
// });

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
