import { FontSizes, FontWeights } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  default: {
    fontSize: FontSizes.fs16,
    lineHeight: FontSizes.fs24,
  },
  defaultSemiBold: {
    fontSize: FontSizes.fs16,
    lineHeight: FontSizes.fs24,
    fontWeight: FontWeights.semibold,
  },
  title: {
    fontSize: FontSizes.fs32,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.fs32,
  },
  subtitle: {
    fontSize: FontSizes.fs20,
    fontWeight: FontWeights.bold,
  },
  link: {
    lineHeight: FontSizes.fs30,
    fontSize: FontSizes.fs16,
    color: "#0a7ea4",
  },
});
