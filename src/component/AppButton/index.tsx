import React, { memo } from "react";
import {
    ActivityIndicator,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import AppText from "../Text";
import { styles } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  pressContainer?: ViewStyle;
  txtStyle?: TextStyle;
}

const CommonButton = memo(
  ({
    title,
    onPress,
    disabled = false,
    loading = false,
    pressContainer,
    txtStyle,
  }: Props) => {
    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          pressContainer,
          isDisabled && styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <AppText
            style={[styles.text, txtStyle, isDisabled && styles.disabledText]}
          >
            {title}
          </AppText>
        )}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // CUSTOM RE-RENDER LOGIC
    return (
      prevProps.title === nextProps.title &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.loading === nextProps.loading &&
      prevProps.onPress === nextProps.onPress
    );
  }
);

export default CommonButton;
