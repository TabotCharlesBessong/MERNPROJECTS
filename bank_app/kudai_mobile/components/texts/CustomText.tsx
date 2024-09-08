import { COLORS, FONTS } from "@/constants/theme";
import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";

interface CustomTextProps {
  type:
    | "larger"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body1"
    | "body2"
    | "body3"
    | "body4"
    | "body5"
  children: React.ReactNode;
  textColor?: string;
}

const CustomText: FC<CustomTextProps> = ({ type, children, textColor }) => {
  const getStyle = (): any => {
    switch (type) {
      case "larger":
        return [styles.larger,textColor];
      case "h1":
        return styles.h1;
      case "h2":
        return styles.h2;
      case "h3":
        return styles.h3;
      case "h4":
        return styles.h4;
      case "body1":
        return styles.body1;
      case "body2":
        return [styles.body2,textColor];
      case "body3":
        return styles.body3;
      case "body4":
        return styles.body4;
      case "body5":
        return styles.body5;
      default:
        return styles.body1;
    }
  };

  return <Text style={getStyle()}>{children}</Text>;
};

const styles = StyleSheet.create({
  larger: {
    color: COLORS.primary,
    ...FONTS.largeTitle,
    textTransform: "capitalize",
  },
  h1: {
    color: COLORS.black,
    ...FONTS.h1,
    textTransform:"capitalize"
  },
  h2: {
    color: COLORS.black,
    ...FONTS.h2,
  },
  h3: {
    color: COLORS.black,
    ...FONTS.h3,
  },
  h4: {
    color: COLORS.black,
    ...FONTS.h4,
  },
  body1: {
    color: COLORS.black,
    ...FONTS.body1,
  },
  body2: {
    color:  COLORS.black,
    ...FONTS.body2,
  },
  body3: {
    color: COLORS.primary,
    ...FONTS.body3,
  },
  body4: {
    color: COLORS.black,
    ...FONTS.body4,
  },
  body5: {
    color: COLORS.primary,
    ...FONTS.body5,
    textAlign:"right"
  },
});

export default CustomText;
