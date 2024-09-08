import {
  ScrollViewProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";

export interface AuthRadioButtonProps {
  options: string[];
  activeButton: string;
  onChange: (label:string) => void;
  containerOptions?: ScrollViewProps;
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  radioSize?: number;
}

export interface RadioButtonProps {
  label: string;
  onChange: (label: string) => void;
  buttonStyle?: ViewStyle;
  activeButton: string;
  labelStyle?: TextStyle;
  radioSize?: number;
}

const AuthRadioButton: FC<AuthRadioButtonProps> = ({
  activeButton,
  options,
  buttonStyle,
  radioSize,
  onChange,
  containerOptions,
}) => {
  return (
    <View {...containerOptions}>
      {options.map((data) => {
        return (
          <RadioButton
            label={data}
            activeButton={activeButton}
            buttonStyle={buttonStyle}
            onChange={onChange}
            radioSize={radioSize}
          />
        );
      })}
    </View>
  );
};

export default AuthRadioButton;

const RadioButton: FC<RadioButtonProps> = ({
  label,
  onChange,
  buttonStyle,
  activeButton,
  labelStyle,
  radioSize,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onChange(label)}
      style={[buttonStyle, styles.buttonStyle, { marginHorizontal: 8 }]}
    >
      <View
        style={[
          styles.radio,
          radioSize
            ? {
                width: radioSize,
                height: radioSize,
                borderRadius: radioSize,
              }
            : null,
        ]}
      >
        {activeButton === label ? (
          <View
            style={[
              styles.fill,
              radioSize
                ? {
                    width: radioSize / 1.6,
                    height: radioSize / 1.6,
                    borderRadius: radioSize,
                  }
                : null,
            ]}
          ></View>
        ) : null}
      </View>
      <Text style={{ marginLeft: 8 }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 3 / 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  fill: {
    backgroundColor: "green",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
