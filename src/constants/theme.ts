import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

/**
 * Ligh and dark theme colors
 * @description Ligh and dark theme colors
 * @example
 * const colors = Colors.light;
 * const colors = Colors.dark;
 * @returns {Object} Colors object
 * @property {string} text - Text color
 * @property {string} background - Background color
 * @property {string} tint - Tint color
 */
export const Colors = {
  text: "#11181C",
  background: "#fff",
  tint: tintColorLight,
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: tintColorLight,
  blue:"#2F50C1",
  white:"#ffffff",
  black:"#000000",
  gray:"#757281",
  prefixColor:"#58536E",
  inputContainer:"#F4F2F880",
  disable:"#EAE7F2",
  disableTxt:"#A7A3B3",
  heloTxtLightGray:"#00000099",
};

/**
 * Fonts
 * @description Fonts
 * @example
 * const fonts = Fonts.ios;
 * const fonts = Fonts.android;
 * @returns {Object} Fonts object
 * @property {string} sans - Sans font
 * @property {string} serif - Serif font
 * @property {string} rounded - Rounded font
 * @property {string} mono - Mono font
 */

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// FontSizes.js
export const FontSizes = {
  fs11: 11,
  fs12: 12,
  fs14: 14,
  fs16: 16,
  fs18: 18,
  fs20: 20,
  fs24: 24,
  fs28: 28,
  fs30: 30,
  fs32: 32,
  fs36: 36,
  fs40: 40,
  fs44: 44,
  fs48: 48,
  fs52: 52,
  fs56: 56,
  fs60: 60,
};


// Spacing.js
export const Spacing = {
  sp4: 4,
  sp8: 8,
  sp10: 10,
  sp12: 12,
  sp16: 16,
  sp20: 20,
  sp24: 24,
  sp28: 28,
  sp32: 32,
  sp36: 36,
  sp40: 40,
  sp44: 44,
  sp48: 48,
  sp52: 52,
  sp56: 56,
  sp60: 60,
};

export const FontWeights = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

export const FontStyles = {
  normal: "normal",
  italic: "italic",
  bold: "bold",
  underline: "underline",
  strikethrough: "strikethrough",
  monospace: "monospace",
};

export const FontFamily = {
  sans: "sans-serif",
  serif: "serif",
  rounded: "rounded",
  mono: "monospace",
};
