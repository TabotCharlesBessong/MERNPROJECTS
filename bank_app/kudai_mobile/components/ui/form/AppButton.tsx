import React, { FC } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  width?: number | string;
  backgroundColor?: string;
  textColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  loading?:boolean
  loadingText?:string
}

const AppButton: FC<AppButtonProps> = ({
  title,
  onPress,
  width,
  backgroundColor,
  textColor,
  containerStyle,
  titleStyle,
  loading,
  loadingText
}) => {
  const dynamicContainerStyle = {
    width: width || "95%",
    backgroundColor: backgroundColor || "#0F0F0F",
  };

  const dynamicTitleStyle = {
    color: textColor || "#FBFBFB",
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, dynamicContainerStyle, containerStyle]}
    >
      <Text style={[styles.title, dynamicTitleStyle, titleStyle]}>{loading ? loadingText : title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
  },
});

export default AppButton;
