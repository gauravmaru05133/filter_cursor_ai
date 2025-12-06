import { Colors, FontSizes, Spacing } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  helloTxt: {
    color: Colors.heloTxtLightGray,
  },
  nameTxt: {
    fontSize: FontSizes.fs28,
    fontWeight: "bold",
    marginTop: Spacing.sp4,
    lineHeight: 0,
  },
});
