import { StyleSheet } from "react-native";
import { colors } from "../../../utils/theme";

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  containerSearch: { backgroundColor: colors.IndigoDye, height: "100%" },
  search: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 27,
    height: 55,
    alignItems: "center",
  },
  searchInput: { fontSize: 16, flex: 1, marginLeft: 14 },
  searchIcon: {
    backgroundColor: colors.lightWhite(0.6),
    borderRadius: 27,
    height: 46,
    margin: 5,
    width: 46,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  locations: {
    position: "absolute",
    width: "94%",
    backgroundColor: colors.bgGray,
    top: 83,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  locRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 15,
    marginBottom: 1,
    borderBottomWidth: 2,
  },
});
export default styles;
