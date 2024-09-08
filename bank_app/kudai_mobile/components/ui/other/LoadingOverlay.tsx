import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme"; // Make sure to update the import path to match your project structure

const LoadingOverlay: React.FC = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={styles.spinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
    flex:1
  },
  spinner: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default LoadingOverlay;
