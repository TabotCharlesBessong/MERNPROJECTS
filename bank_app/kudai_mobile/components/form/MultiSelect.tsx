import React, { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onSelect: (selectedValues: string[]) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onSelect,
  containerStyle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionPress = (value: string) => {
    const updatedSelectedValues = [...selectedValues];
    const index = updatedSelectedValues.indexOf(value);
    if (index > -1) {
      updatedSelectedValues.splice(index, 1);
    } else {
      updatedSelectedValues.push(value);
    }
    onSelect(updatedSelectedValues);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={{color:COLORS.primary}} >{selectedValues.length} item(s) selected</Text>
        <Ionicons
          name={isDropdownOpen ? "chevron-up" : "chevron-down"}
          size={16}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownOptionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.dropdownOption,
                selectedValues.includes(option.value) && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(option.value)}
            >
              <Text style={{color:COLORS.primary}} >{option.label}</Text>
              {selectedValues.includes(option.value) && (
                <Ionicons name="checkmark" size={16} color="green" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 0,
    borderColor: "#ccc",
    // borderRadius: 4,
    flex:1,
    width:"100%"
  },
  dropdownOptionsContainer: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    zIndex:99
  },
  dropdownOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor:"white"
  },
  selectedOption: {
    backgroundColor: "#f9f9f9",
  },
});

export default MultiSelect;
