import { Spacing } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal:Spacing.sp16,
    paddingVertical:Spacing.sp12,
  },
  avatarImg: {
    width: Spacing.sp40,
    height: Spacing.sp40,
  },
  appLogoStyle:{
    width: 93,
    height: 16,
  }
});
