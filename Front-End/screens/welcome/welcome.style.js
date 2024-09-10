import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  ingredients: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginTop: SIZES.large,
    textAlign: "center",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
    textAlign: "center",
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    textAlign: "center",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  input: {
    width: "50%",
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 1,
    marginLeft: 180,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginRight: 10,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.primary,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.primary : COLORS.primary,
  }),
  userMenu: {
    position: "relative",
  },
  mainMenu: {
    position: "absolute",
    top: windowHeight * 0.1 - 150,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  notificationContainer: {
    backgroundColor: COLORS.beige,
    width: "90%",
    padding: 10,
    borderRadius: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 1,
  },
  notificationMessage: {
    fontSize: SIZES.mediumLarge,
    marginBottom: 10,
    textAlign: "center",
  },
  notificationButton: {
    backgroundColor: COLORS.buttonBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  notificationButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  brewingSessionContainer: {
    backgroundColor: COLORS.beige,
    padding: 15,
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
    width: "90%",
    minHeight: 150,
    marginBottom: 10,
  },
  brewingSessionTitle: {
    color: COLORS.primary,
    fontSize: SIZES.mediumLarge,
    fontWeight: "bold",
    fontFamily: FONT.bold,
    marginBottom: 10,
  },
  brewingSessionDetail: {
    fontSize: SIZES.medium,
    marginBottom: 10,
  },
  seeMoreText: {
    color: COLORS.buttonBlue,
    fontFamily: FONT.bold,
    fontSize: SIZES.mediumLarge,
  },
  noSessionText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default styles;
