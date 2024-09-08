import React, { FC } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useField } from "formik";
import colors from "@/constants/Colors";
import { COLORS } from "@/constants/theme";

interface AuthSelectFieldProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
}

const AuthSelectField: FC<AuthSelectFieldProps> = ({
  name,
  label,
  options,
  containerStyle,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View style={containerStyle}>
      {label && (
        <View style={styles.label}>
          <Text>{label}</Text>
        </View>
      )}
      <View style={styles.input}>
        <RNPickerSelect
          placeholder={{
            label: placeholder || "Select an option",
            value: null,
            color: "gray",
          }}
          items={options}
          onValueChange={(value) => helpers.setValue(value)}
          value={field.value}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      {meta.touched && meta.error ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

export default AuthSelectField;

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
    textAlign: "left",
  },
  label: {
    color: "green",
    width: 380,
    marginBottom: 16,
    left: 4,
  },
  pickerInput: {
    color: "green",
    textAlign: "left",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  containerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
