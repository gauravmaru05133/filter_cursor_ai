import React, { memo } from "react";
import { Text, type TextProps } from "react-native";

import { Colors } from "@/src/constants/theme";
import { styles } from "./styles";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

// eslint-disable-next-line react/display-name
const AppText = memo(
  ({
    style,
    lightColor,
    darkColor,
    type = "default",
    ...rest
  }: ThemedTextProps) => {

    return (
      <Text
        style={[
          { color:Colors.text },
          type === "default" && styles.default,
          type === "title" && styles.title,
          type === "defaultSemiBold" && styles.defaultSemiBold,
          type === "subtitle" && styles.subtitle,
          type === "link" && styles.link,
          style,
        ]}
        {...rest}
      />
    );
  },

  // 🔥 Custom compare to prevent re-render
  (prev, next) =>
    prev.children === next.children &&
    prev.type === next.type &&
    prev.lightColor === next.lightColor &&
    prev.darkColor === next.darkColor &&
    prev.style === next.style &&
    prev.onPress === next.onPress // if used
);

export default AppText;
