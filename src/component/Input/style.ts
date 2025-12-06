import { Colors, FontSizes, Spacing } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: FontSizes.fs11,
    color: Colors.prefixColor,
    fontWeight: "500",
    paddingTop: Spacing.sp4,
    marginBottom: -10,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputContainer,
    paddingVertical: Spacing.sp8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
    paddingLeft:Spacing.sp10
  },
  mainChildContainer: {
    flexDirection: "row",
    justifyContent:'center',alignContent:'center',alignItems:'center'
  },
  prefixContainer: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  prefixTxtStyle: {
    color: Colors.prefixColor,
    fontSize: FontSizes.fs16,
  },
  prefixDivider: {
    width: 2,
    height: 20,
    backgroundColor: Colors.gray,
    borderRadius: 2,
    marginHorizontal: 10,
  },
});
