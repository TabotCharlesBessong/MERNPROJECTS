import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useField, useFormikContext } from "formik";
import { COLORS } from "@/constants/theme";
import CustomText from "@/components/texts/CustomText";

interface CustomDateTimePickerProps {
  name: string;
  label: string;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  name,
  label,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [showPicker, setShowPicker] = React.useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setFieldValue(name, selectedDate.toISOString().substring(11, 19));
    }
  };

  return (
    <View style={styles.pickerContainer}>
      <CustomText type="body1">{label}</CustomText>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.pickerButton}
      >
        <CustomText type="body2">
          {field.value ? field.value : "Select Time"}
        </CustomText>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleChange}
        />
      )}
      {meta.touched && meta.error && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 10,
  },
  pickerButton: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
  },
});

export default CustomDateTimePicker;
