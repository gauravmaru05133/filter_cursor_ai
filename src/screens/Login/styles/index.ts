import { Colors, FontSizes, Spacing } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navigationContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: 20,
  },
  leftIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: Spacing.sp8,
  },
  cancelTxt: {
    color: Colors.blue,
    paddingLeft: Spacing.sp8,
    fontSize: FontSizes.fs18,
  },
  loginChildContainer: {
    marginHorizontal: Spacing.sp16,
    flex: 1,
  },
  loginTxtContainer: {
    paddingTop: 25,
    paddingBottom: Spacing.sp12,
    fontWeight: "bold",
    fontSize: FontSizes.fs30,
    includeFontPadding: false,
  },
  loginMsg: {
    fontSize: FontSizes.fs16,
    includeFontPadding: false,
    color: Colors.gray,
    marginBottom: Spacing.sp36,
  },
  loginBtnParentContainer: {
    marginVertical: Spacing.sp28,
    width: "100%",
  },
});
