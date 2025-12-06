// CommonTextInput.js
import React, { useState } from "react";
import {
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View
} from "react-native";
import AppText from "../Text";
import { styles } from "./style";

interface CommonTextInputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  focusBorderColor?: string;
  blurBorderColor?: string;
  prefix?: string;
  prefixStyle?: TextStyle;
  value?:string
}

const Input: React.FC<CommonTextInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  focusBorderColor = "#007AFF",
  blurBorderColor = "#ccc",
  style,
  prefix,
  prefixStyle,
  value,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          { borderColor: isFocused ? focusBorderColor : blurBorderColor },
        ]}
      >
        {label && value?.length>0 && <AppText style={styles.label}>{label}</AppText>}
        <View
          style={[
            styles.mainChildContainer,
            // styles.inputWrapper,
            // { borderColor: isFocused ? focusBorderColor : blurBorderColor },
          ]}
        >
          {leftIcon}
          {prefix && (
            <View
              style={styles.prefixContainer}
            >
              <AppText
                style={[
                  styles.prefixTxtStyle,
                  prefixStyle,
                ]}
              >
                {prefix}
              </AppText>
              <View
                style={styles.prefixDivider}
              />
            </View>
          )}

          <TextInput
            style={[styles.input, style]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...textInputProps} // passes all TextInput props
          />
          {rightIcon && (
            <TouchableOpacity
              style={styles.iconRight}
              onPress={onRightIconPress}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Input;
