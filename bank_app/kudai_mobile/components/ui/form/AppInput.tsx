import colors from "@/constants/Colors";
import { COLORS } from "@/constants/theme";
import React, { FC } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps
} from "react-native";

interface Props extends TextInputProps {}

const AppInput: FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

export default AppInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
  },
});
