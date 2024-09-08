import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "@/constants/Colors";

interface AppSelectProps {
  options: string[];
  onSelectOption: (option: string) => void;
  selectedOption: string;
}

const AppSelect: FC<AppSelectProps> = (props) => {
  const { options, onSelectOption, selectedOption } = props;

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => onSelectOption(option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === option && styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AppSelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 5,
    padding: 10,
  },
  option: {
    flex: 1,
  },
  optionText: {
    color: colors.SECONDARY,
  },
  selectedOption: {
    backgroundColor: colors.PRIMARY,
  },
  selectedOptionText: {
    color: "white",
  },
});
